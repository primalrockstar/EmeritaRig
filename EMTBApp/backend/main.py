from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os
import jwt
from sqlalchemy.orm import Session
import stripe
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from .stripe_ops import handle_checkout_session

# Import from root backend
from .database import SessionLocal
from .models import User, Question, ExamAttempt, Flashcard, Medication
from .auth import SECRET_KEY, ALGORITHM
from .services.engine import calculate_elo, get_next_question
from .routers.flashcards import router as flashcards_router
from .routers.scenarios import router as scenarios_router
from .routers.meds import router as meds_router
from .routers.auth import router as auth_router

def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": f"Rate limit exceeded: {exc.detail}"},
    )

load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flashcards_router, prefix="/api")
app.include_router(scenarios_router, prefix="/api")
app.include_router(meds_router, prefix="/api")
app.include_router(auth_router, prefix="/api")

# Free Tier Limits
FREE_TIER_LIMITS = {
    "chapters": 4,
    "flashcards": 25,
    "scenarios": 5
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

@app.get("/")
def read_root():
    return {"Status": "EMT-B Backend is Live"}

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
    question_id: int,
    selected_option: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    is_correct = selected_option == question.correct_answer
    actual_score = 1 if is_correct else 0

    new_user_rating, new_question_rating = calculate_elo(
        current_user.elo_rating, question.difficulty, actual_score
    )

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
        "new_user_rating": new_user_rating
    }


@app.get("/exam/next")
def get_next_question_endpoint(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    question = get_next_question(current_user.id, db)
    if not question:
        raise HTTPException(status_code=404, detail="No questions available")
    return {
        "id": question.id,
        "text": question.text,
        "options": question.options,
        "category": question.category
    }