from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Flashcard, User
from typing import List, Optional

from fastapi.security import OAuth2PasswordBearer
from auth import SECRET_KEY, ALGORITHM
import jwt
from fastapi import HTTPException, status

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

router = APIRouter()

@router.get("/flashcards")
def get_flashcards(
    chapter_id: Optional[int] = Query(None),
    category: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Flashcard)
    if chapter_id:
        query = query.filter(Flashcard.chapter_id == chapter_id)
    if category:
        query = query.filter(Flashcard.category == category)
    # Freeminum logic: if not premium, only chapters 1,2,3
    if not current_user.has_lifetime_access:
        query = query.filter(Flashcard.chapter_id.in_([1, 2, 3]))
    return query.all()

@router.get("/flashcards/categories")
def get_flashcard_categories(db: Session = Depends(get_db)):
    categories = db.query(Flashcard.category).distinct().all()
    return [cat[0] for cat in categories]