from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Scenario, User
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

@router.get("/scenarios")
def get_scenarios(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    scenarios = db.query(Scenario).all()
    # Add is_locked field
    for scenario in scenarios:
        scenario.is_locked = not current_user.has_lifetime_access and scenario.id != 1
    return scenarios

@router.get("/scenarios/{scenario_id}")
def get_scenario(scenario_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")
    # Check if user can access this scenario
    if not current_user.has_lifetime_access and scenario.id != 1:
        raise HTTPException(status_code=403, detail="Access denied: Premium required")
    return scenario