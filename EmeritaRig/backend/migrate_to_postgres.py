import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .database import Base
from .models import User, Question, ExamAttempt, Flashcard, Scenario, Medication

# SQLite source
SQLITE_URL = "sqlite:///./emt_app.db"
sqlite_engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})
SqliteSession = sessionmaker(autocommit=False, autoflush=False, bind=sqlite_engine)

# PostgreSQL target
POSTGRES_URL = os.getenv("DATABASE_URL")
if not POSTGRES_URL:
    raise ValueError("DATABASE_URL environment variable not set")
postgres_engine = create_engine(POSTGRES_URL, pool_pre_ping=True)
PostgresSession = sessionmaker(autocommit=False, autoflush=False, bind=postgres_engine)

def migrate_data():
    # Create tables in PostgreSQL
    Base.metadata.create_all(bind=postgres_engine)

    sqlite_session = SqliteSession()
    postgres_session = PostgresSession()

    try:
        # Migrate Users
        users = sqlite_session.query(User).all()
        for user in users:
            postgres_session.add(User(
                id=user.id,
                email=user.email,
                hashed_password=user.hashed_password,
                is_superuser=user.is_superuser,
                has_lifetime_access=user.has_lifetime_access,
                elo_rating=user.elo_rating,
                is_premium=user.is_premium,
                semester_pass_active=user.semester_pass_active,
                plan_expiration=user.plan_expiration,
                stripe_customer_id=user.stripe_customer_id,
                stripe_subscription_id=user.stripe_subscription_id
            ))
        postgres_session.commit()

        # Migrate Questions
        questions = sqlite_session.query(Question).all()
        for q in questions:
            postgres_session.add(Question(
                id=q.id,
                text=q.text,
                options=q.options,
                correct_answer=q.correct_answer,
                explanation=q.explanation,
                category=q.category,
                difficulty=q.difficulty
            ))
        postgres_session.commit()

        # Migrate ExamAttempts
        attempts = sqlite_session.query(ExamAttempt).all()
        for a in attempts:
            postgres_session.add(ExamAttempt(
                id=a.id,
                user_id=a.user_id,
                question_id=a.question_id,
                is_correct=a.is_correct
            ))
        postgres_session.commit()

        # Migrate Flashcards
        flashcards = sqlite_session.query(Flashcard).all()
        for f in flashcards:
            postgres_session.add(Flashcard(
                id=f.id,
                front=f.front,
                back=f.back,
                category=f.category,
                chapter_id=f.chapter_id,
                difficulty=f.difficulty,
                image_url=f.image_url
            ))
        postgres_session.commit()

        # Migrate Scenarios
        scenarios = sqlite_session.query(Scenario).all()
        for s in scenarios:
            postgres_session.add(Scenario(
                id=s.id,
                title=s.title,
                dispatch_info=s.dispatch_info,
                vitals=s.vitals,
                narrative_key_points=s.narrative_key_points,
                difficulty=s.difficulty,
                category=s.category
            ))
        postgres_session.commit()

        # Migrate Medications
        medications = sqlite_session.query(Medication).all()
        for m in medications:
            postgres_session.add(Medication(
                id=m.id,
                generic_name=m.generic_name,
                brand_names=m.brand_names,
                drug_class=m.drug_class,
                action=m.action,
                indications=m.indications,
                contraindications=m.contraindications,
                interactions=m.interactions,
                dose_adult=m.dose_adult,
                dose_ped=m.dose_ped,
                route=m.route,
                side_effects=m.side_effects
            ))
        postgres_session.commit()

        print("Migration completed successfully.")

    except Exception as e:
        postgres_session.rollback()
        print(f"Migration failed: {e}")
    finally:
        sqlite_session.close()
        postgres_session.close()

if __name__ == "__main__":
    migrate_data()