from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import jwt
import logging
from sqlalchemy.orm import Session
import stripe
from .stripe_ops import handle_checkout_session

# Prometheus metrics
try:
    from prometheus_fastapi_instrumentator import Instrumentator
except ImportError:
    Instrumentator = None

# Import from root backend
from .database import SessionLocal
from .models import User, Question, ExamAttempt, Flashcard, Medication
from .auth import SECRET_KEY, ALGORITHM
from .services.engine import calculate_elo, get_next_question
from .routers.auth import router as auth_router
from .routers.flashcards import router as flashcards_router
from .routers.scenarios import router as scenarios_router
from .routers.meds import router as meds_router

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

stripe.api_key = os.getenv("STRIPE_API_KEY")

app = FastAPI()

# Instrument with Prometheus if available
if Instrumentator:
    Instrumentator().instrument(app).expose(app)

def create_admin_user():
    db = SessionLocal()
    try:
        # Check if admin user exists
        admin_email = "admin@emeritaclinical.com"
        existing_admin = db.query(User).filter(User.email == admin_email).first()
        hashed_password = get_password_hash("Fdd1FU1cH58e3T0_z05xkA")
        if not existing_admin:
            # Create admin user
            admin_user = User(
                email=admin_email,
                hashed_password=hashed_password,
                is_superuser=True,
                has_lifetime_access=True
            )
            db.add(admin_user)
            db.commit()
            print(f"Created admin user: {admin_email}")
        else:
            # Update password
            existing_admin.hashed_password = hashed_password
            existing_admin.is_superuser = True
            existing_admin.has_lifetime_access = True
            db.commit()
            print(f"Updated admin user: {admin_email}")
    finally:
        db.close()

create_admin_user()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def cors_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

# Input sanitization middleware
@app.middleware("http")
async def sanitize_input(request: Request, call_next):
    # For POST/PUT requests, sanitize JSON body
    if request.method in ["POST", "PUT", "PATCH"]:
        try:
            body = await request.body()
            if body:
                import json
                data = json.loads(body.decode())
                # Simple sanitization: strip whitespace and limit length
                def sanitize(obj):
                    if isinstance(obj, str):
                        return obj.strip()[:1000]  # Limit to 1000 chars
                    elif isinstance(obj, dict):
                        return {k: sanitize(v) for k, v in obj.items()}
                    elif isinstance(obj, list):
                        return [sanitize(item) for item in obj]
                    return obj
                sanitized = sanitize(data)
                # Replace request body
                import io
                request._body = json.dumps(sanitized).encode()
        except:
            pass
    response = await call_next(request)
    return response

app.include_router(auth_router, prefix="/api/auth")
app.include_router(flashcards_router, prefix="/api")
app.include_router(scenarios_router, prefix="/api")
app.include_router(meds_router, prefix="/api")

# Free Tier Limits
FREE_TIER_LIMITS = {
    "chapters": 4,
    "flashcards": 25,
    "scenarios": 5
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class SubmitAnswerRequest(BaseModel):
    question_id: int
    selected_option: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.get("/api/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.email.split('@')[0],
        "role": "admin" if current_user.is_superuser else "student",
        "elo_rating": current_user.elo_rating,
        "has_lifetime_access": current_user.has_lifetime_access,
        "emailVerified": True,
        "isInstructorVerified": True
    }

@app.get("/")
def read_root():
    return {"Status": "EMT-B Backend is Live"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": "2025-12-09T08:12:00Z"}

@app.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        return {"error": "Invalid payload"}
    except stripe.error.SignatureVerificationError as e:
        return {"error": "Invalid signature"}
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        db = SessionLocal()
        try:
            handle_checkout_session(session, db)
        finally:
            db.close()
    return {"status": "success"}

@app.get("/api/chapters")
def get_chapters(current_user: User = Depends(get_current_user)):
    chapters = []
    for i in range(1, 46):  # 45 chapters
        is_locked = not current_user.has_lifetime_access and i > FREE_TIER_LIMITS["chapters"]
        chapters.append({
            "id": i,
            "title": f"Chapter {i}",
            "is_locked": is_locked,
            "content": "" if is_locked else f"Content for chapter {i}"
        })
    return chapters


@app.post("/api/create-checkout-session")
def create_checkout_session(current_user: User = Depends(get_current_user)):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': 'price_H5ggYwtDq...',  # Replace with actual Price ID
                'quantity': 1
            }],
            mode='payment',
            client_reference_id=str(current_user.id),
            customer_email=current_user.email,
            success_url='http://localhost:3000/dashboard?payment=success',
            cancel_url='http://localhost:3000/dashboard?payment=cancelled'
        )
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/exam/start")
def start_exam(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    question = get_next_question(current_user.id, db)
    if not question:
        raise HTTPException(status_code=404, detail="No questions available")
    return {
        "id": question.id,
        "text": question.text,
        "options": question.options,
        "category": question.category
    }


@app.post("/exam/submit")
def submit_answer(
    request: SubmitAnswerRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    question = db.query(Question).filter(Question.id == request.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    is_correct = request.selected_option == question.correct_answer
    actual_score = 1 if is_correct else 0

    old_rating = current_user.elo_rating
    new_user_rating, new_question_rating = calculate_elo(
        current_user.elo_rating, question.difficulty, actual_score
    )

    elo_change = new_user_rating - old_rating

    current_user.elo_rating = new_user_rating
    question.difficulty = new_question_rating

    attempt = ExamAttempt(
        user_id=current_user.id,
        question_id=question.id,
        is_correct=is_correct
    )
    db.add(attempt)
    db.commit()

    return {
        "correct": is_correct,
        "explanation": question.explanation,
        "eloChange": elo_change
    }


@app.get("/exam/next")
def get_next_question_endpoint(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    question = get_next_question(current_user.id, db)
    if not question:
        return {
            "exam_complete": True,
            "message": "Congratulations! You have completed all available questions."
        }
    return {
        "id": question.id,
        "text": question.text,
        "options": question.options,
        "category": question.category
    }