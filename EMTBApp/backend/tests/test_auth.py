import pytest
from sqlalchemy.orm import Session

from models import User
from auth import get_password_hash


def test_register_user(client, test_db):
    """Test user registration"""
    response = client.post("/api/auth/register", json={
        "email": "newuser@example.com",
        "password": "testpass123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

    # Verify user was created in database
    user = test_db.query(User).filter(User.email == "newuser@example.com").first()
    assert user is not None
    assert user.email == "newuser@example.com"


def test_register_duplicate_user(client, test_user):
    """Test registering with existing email fails"""
    response = client.post("/api/auth/register", json={
        "email": "test@example.com",  # Already exists
        "password": "testpass123"
    })
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"].lower()


def test_login_success(client, test_user):
    """Test successful login"""
    response = client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "testpass"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()


def test_login_wrong_password(client, test_user):
    """Test login with wrong password"""
    response = client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "wrongpass"
    })
    assert response.status_code == 401
    assert "incorrect" in response.json()["detail"].lower()


def test_login_nonexistent_user(client):
    """Test login with non-existent user"""
    response = client.post("/api/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "testpass"
    })
    assert response.status_code == 401


def test_get_current_user(auth_headers, client, test_user):
    """Test getting current user info"""
    response = client.get("/api/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data


def test_health_check(client):
    """Test health check endpoint"""
    response = client.get("/api/auth/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"