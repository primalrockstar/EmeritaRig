from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Flashcard, User
from typing import List, Optional

# Assuming get_current_user is available; import from main or define here
# For simplicity, import from main if possible, but since it's in another file, perhaps define locally or assume it's passed.

# Since the router is included in main.py which has get_current_user, but routers are separate.
# I need to define get_current_user in this file or import it.

# To make it work, I'll add the dependency to the router functions.

# First, need to import the dependency.

# Since get_current_user is in main.py, and routers are separate, perhaps I need to move get_current_user to a shared place.

# For now, I'll copy the get_current_user logic here, but that's not ideal.

# Looking at the main.py, it imports from backend.auth, and defines oauth2_scheme.

# Let's import necessary.

from fastapi.security import OAuth2PasswordBearer
from ..auth import SECRET_KEY, ALGORITHM
import jwt
from fastapi import HTTPException, status

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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