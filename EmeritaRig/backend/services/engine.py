from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models import Question, User, ExamAttempt


def calculate_elo(user_rating: float, question_rating: float, actual_score: int) -> tuple[float, float]:
    """
    Calculate new Elo ratings for user and question using the Elo rating system.

    Args:
        user_rating: Current user Elo rating
        question_rating: Current question difficulty rating
        actual_score: 1 if correct, 0 if incorrect

    Returns:
        Tuple of (new_user_rating, new_question_rating)
    """
    K = 32
    expected_score = 1 / (1 + 10 ** ((question_rating - user_rating) / 400))
    new_user_rating = user_rating + K * (actual_score - expected_score)
    new_question_rating = question_rating + K * ((1 - actual_score) - (1 - expected_score))
    return new_user_rating, new_question_rating


def get_next_question(user_id: int, db: Session) -> Question | None:
    """
    Get the next adaptive question for the user, closest to their current Elo rating.
    Excludes questions the user has already answered.

    Args:
        user_id: User ID
        db: Database session

    Returns:
        Question object or None if user not found or no questions available
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    # Get question IDs the user has already answered
    answered_question_ids = db.query(ExamAttempt.question_id).filter(ExamAttempt.user_id == user_id).subquery()

    # Find the next unanswered question closest to user's Elo rating
    question = db.query(Question)\
        .filter(~Question.id.in_(answered_question_ids))\
        .order_by(func.abs(Question.difficulty - user.elo_rating))\
        .first()

    return question