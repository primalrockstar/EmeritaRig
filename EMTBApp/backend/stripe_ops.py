from sqlalchemy.orm import Session
from models import User

def handle_checkout_session(session, db: Session):
    user_id = session.client_reference_id
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user:
        user.has_lifetime_access = True
        db.commit()
        print(f"Access granted to user {user_id}")