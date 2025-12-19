from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, JSON, String, Text, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String, nullable=True)
    hashed_password = Column(String)
    is_superuser = Column(Boolean, default=False)
    has_lifetime_access = Column(Boolean, default=False)
    elo_rating = Column(Float, default=1000.0)
    
    # Subscription fields
    is_premium = Column(Boolean, default=False)
    semester_pass_active = Column(Boolean, default=False)
    plan_expiration = Column(DateTime, nullable=True)
    stripe_customer_id = Column(String, nullable=True)
    stripe_subscription_id = Column(String, nullable=True)


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    options = Column(JSON)
    correct_answer = Column(String)
    explanation = Column(String)
    category = Column(String)
    difficulty = Column(Float, default=1000.0)


class ExamAttempt(Base):
    __tablename__ = "exam_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))
    is_correct = Column(Boolean)


class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    front = Column(String)
    back = Column(String)
    category = Column(String)
    chapter_id = Column(Integer)
    difficulty = Column(Integer, default=1)
    image_url = Column(String, nullable=True)


class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    dispatch_info = Column(Text)
    vitals = Column(JSON)
    narrative_key_points = Column(JSON)
    difficulty = Column(String)
    category = Column(String)


class Medication(Base):
    __tablename__ = "medications"

    id = Column(Integer, primary_key=True, index=True)
    generic_name = Column(String, index=True)
    brand_names = Column(String)
    drug_class = Column(String)
    action = Column(Text)
    indications = Column(JSON)
    contraindications = Column(JSON)
    interactions = Column(Text)
    dose_adult = Column(String)
    dose_ped = Column(String)
    route = Column(String)
    side_effects = Column(JSON)


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    content_type = Column(String, nullable=False)  # 'question', 'flashcard', 'scenario', 'study_note', etc.
    content_id = Column(String, nullable=False)    # ID of the content piece
    issue_type = Column(Enum('clinical_error', 'typo', 'outdated', 'unclear', 'other', name='issue_type'), nullable=False)
    description = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user_email = Column(String, nullable=True)    # For anonymous reports
    status = Column(Enum('pending', 'reviewed', 'fixed', 'invalid', name='issue_status'), default='pending')
    priority = Column(Enum('low', 'medium', 'high', 'critical', name='issue_priority'), default='medium')
    admin_notes = Column(Text, nullable=True)
    reward_given = Column(Boolean, default=False)
    reward_type = Column(Enum('free_month', 'badge', 'credit', name='reward_type'), nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    reviewed_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", backref="reported_issues")