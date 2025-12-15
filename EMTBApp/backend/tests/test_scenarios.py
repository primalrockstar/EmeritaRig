import pytest
from models import Scenario


@pytest.fixture(scope="function")
def test_scenarios(test_db):
    """Create test scenarios"""
    scenarios = [
        Scenario(
            title="Chest Pain Assessment",
            dispatch_info="25-year-old male complaining of chest pain",
            vitals={"BP": "120/80", "HR": "85", "RR": "16", "SpO2": "98%"},
            narrative_key_points=["Sudden onset chest pain", "Radiates to left arm", "Shortness of breath"],
            difficulty="Intermediate",
            category="Cardiology"
        ),
        Scenario(
            title="Diabetic Emergency",
            dispatch_info="45-year-old female found unconscious",
            vitals={"BP": "90/60", "HR": "120", "RR": "8", "SpO2": "92%", "BG": "35 mg/dL"},
            narrative_key_points=["History of diabetes", "Found with glucometer", "Empty insulin vial nearby"],
            difficulty="Advanced",
            category="Endocrinology"
        )
    ]
    for scenario in scenarios:
        test_db.add(scenario)
    test_db.commit()
    for scenario in scenarios:
        test_db.refresh(scenario)
    return scenarios


def test_get_scenarios_unauthenticated(client):
    """Test getting scenarios without authentication fails"""
    response = client.get("/api/scenarios/scenarios")
    assert response.status_code == 401


def test_get_scenarios_free_user(client, auth_headers, test_scenarios):
    """Test free user sees locked scenarios"""
    response = client.get("/api/scenarios/scenarios", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

    # First scenario should be unlocked for free users
    assert data[0]["is_locked"] == False
    # Second scenario should be locked for free users
    assert data[1]["is_locked"] == True


def test_get_scenarios_premium_user(client, test_db, test_scenarios):
    """Test premium user can access all scenarios"""
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

    # All scenarios should be unlocked
    response = client.get("/api/scenarios/scenarios", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    for scenario in data:
        assert scenario["is_locked"] == False


def test_get_scenario_by_id_free_user(client, auth_headers, test_scenarios):
    """Test free user can access first scenario"""
    scenario_id = test_scenarios[0].id
    response = client.get(f"/api/scenarios/scenarios/{scenario_id}", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Chest Pain Assessment"


def test_get_scenario_by_id_locked(client, auth_headers, test_scenarios):
    """Test free user cannot access locked scenario"""
    scenario_id = test_scenarios[1].id  # Second scenario is locked
    response = client.get(f"/api/scenarios/scenarios/{scenario_id}", headers=auth_headers)
    assert response.status_code == 403
    assert "premium required" in response.json()["detail"].lower()


def test_get_scenario_by_id_premium_user(client, test_db, test_scenarios):
    """Test premium user can access any scenario"""
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

    # Can access locked scenario
    scenario_id = test_scenarios[1].id
    response = client.get(f"/api/scenarios/scenarios/{scenario_id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Diabetic Emergency"


def test_get_scenario_not_found(client, auth_headers):
    """Test getting non-existent scenario returns 404"""
    response = client.get("/api/scenarios/scenarios/999", headers=auth_headers)
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_get_scenario_unauthenticated(client, test_scenarios):
    """Test getting specific scenario without authentication fails"""
    scenario_id = test_scenarios[0].id
    response = client.get(f"/api/scenarios/scenarios/{scenario_id}")
    assert response.status_code == 401