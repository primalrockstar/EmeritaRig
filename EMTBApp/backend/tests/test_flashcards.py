import pytest
from models import Flashcard


@pytest.fixture(scope="function")
def test_flashcards(test_db):
    """Create test flashcards"""
    cards = [
        Flashcard(
            front="What is the normal adult heart rate?",
            back="60-100 beats per minute",
            category="Cardiology",
            chapter_id=1,
            difficulty=1
        ),
        Flashcard(
            front="What is the Glasgow Coma Scale used for?",
            back="Assessing level of consciousness",
            category="Neurology",
            chapter_id=2,
            difficulty=2
        ),
        Flashcard(
            front="What is the normal respiratory rate for adults?",
            back="12-20 breaths per minute",
            category="Respiratory",
            chapter_id=4,
            difficulty=1
        )
    ]
    for card in cards:
        test_db.add(card)
    test_db.commit()
    for card in cards:
        test_db.refresh(card)
    return cards


def test_get_flashcards_unauthenticated(client):
    """Test getting flashcards without authentication fails"""
    response = client.get("/api/flashcards/flashcards")
    assert response.status_code == 401


def test_get_flashcards_authenticated(client, auth_headers, test_flashcards):
    """Test getting all flashcards when authenticated"""
    response = client.get("/api/flashcards/flashcards", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    # Should only return chapters 1,2,3 for free users
    assert len(data) == 2  # Only cards from chapters 1 and 2
    chapter_ids = [card["chapter_id"] for card in data]
    assert 1 in chapter_ids
    assert 2 in chapter_ids
    assert 4 not in chapter_ids


def test_get_flashcards_premium_user(client, test_db, test_flashcards):
    """Test premium user can access all flashcards"""
    from auth import get_password_hash
    from models import User

    # Create premium user
    premium_user = User(
        email="premium@example.com",
        hashed_password=get_password_hash("testpass"),
        has_lifetime_access=True
    )
    test_db.add(premium_user)
    test_db.commit()

    # Login as premium user
    response = client.post("/api/auth/login", json={
        "email": "premium@example.com",
        "password": "testpass"
    })
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Should get all flashcards
    response = client.get("/api/flashcards/flashcards", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 3  # All cards


def test_get_flashcards_by_chapter(client, auth_headers, test_flashcards):
    """Test filtering flashcards by chapter"""
    response = client.get("/api/flashcards/flashcards?chapter_id=1", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["chapter_id"] == 1
    assert "heart rate" in data[0]["front"].lower()


def test_get_flashcards_by_category(client, auth_headers, test_flashcards):
    """Test filtering flashcards by category"""
    response = client.get("/api/flashcards/flashcards?category=Cardiology", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["category"] == "Cardiology"


def test_get_flashcard_categories(client):
    """Test getting flashcard categories"""
    response = client.get("/api/flashcards/flashcards/categories")
    assert response.status_code == 200
    data = response.json()
    # Should include categories from test data
    assert "Cardiology" in data
    assert "Neurology" in data
    assert "Respiratory" in data