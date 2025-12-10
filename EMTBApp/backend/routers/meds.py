from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Medication, User
from typing import List, Optional
from fastapi.security import OAuth2PasswordBearer
from auth import SECRET_KEY, ALGORITHM
import jwt
from fastapi import status

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

@router.get("/medications")
def get_medications(
    q: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Medication)
    if q:
        # Search in generic_name and brand_names (case insensitive)
        search_term = f"%{q}%"
        query = query.filter(
            (Medication.generic_name.ilike(search_term)) |
            (Medication.brand_names.ilike(search_term))
        )
    return query.all()

@router.get("/medications/{medication_id}")
def get_medication(
    medication_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    medication = db.query(Medication).filter(Medication.id == medication_id).first()
    if not medication:
        raise HTTPException(status_code=404, detail="Medication not found")
    return medication