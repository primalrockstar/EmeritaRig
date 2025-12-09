from backend.database import SessionLocal, Base, engine
from backend.models import User
from backend.auth import get_password_hash

Base.metadata.create_all(bind=engine)

db = SessionLocal()

existing_admin = db.query(User).filter(User.email == "emtb_admin@webconnect360.com").first()

if not existing_admin:
    password = "Fdd1FU1cH58e3T0_z05xkA"
    hashed_password = get_password_hash(password)
    admin = User(
        email="emtb_admin@webconnect360.com",
        hashed_password=hashed_password,
        is_superuser=True,
        has_lifetime_access=True
    )
    db.add(admin)
    db.commit()
    print(f"Admin user created: {admin.email}")
else:
    print("Admin already exists")

db.close()