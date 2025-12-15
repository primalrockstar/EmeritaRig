import pytest
from models import Medication


@pytest.fixture(scope="function")
def test_medications(test_db):
    """Create test medications"""
    meds = [
        Medication(
            generic_name="Acetaminophen",
            brand_names="Tylenol",
            drug_class="Analgesic",
            action="Reduces fever and pain",
            indications=["Pain", "Fever"],
            contraindications=["Liver disease"],
            interactions="May interact with alcohol",
            dose_adult="500-1000mg every 4-6 hours",
            dose_ped="10-15mg/kg every 4-6 hours",
            route="Oral",
            side_effects=["Nausea", "Rash"]
        ),
        Medication(
            generic_name="Ibuprofen",
            brand_names="Advil, Motrin",
            drug_class="NSAID",
            action="Reduces inflammation and pain",
            indications=["Pain", "Inflammation", "Fever"],
            contraindications=["GI ulcers", "Renal impairment"],
            interactions="May interact with aspirin",
            dose_adult="400-600mg every 4-6 hours",
            dose_ped="5-10mg/kg every 6-8 hours",
            route="Oral",
            side_effects=["GI upset", "Dizziness"]
        )
    ]
    for med in meds:
        test_db.add(med)
    test_db.commit()
    for med in meds:
        test_db.refresh(med)
    return meds


def test_get_medications_unauthenticated(client):
    """Test getting medications without authentication fails"""
    response = client.get("/api/meds/medications")
    assert response.status_code == 401


def test_get_medications_authenticated(client, auth_headers, test_medications):
    """Test getting all medications when authenticated"""
    response = client.get("/api/meds/medications", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["generic_name"] == "Acetaminophen"
    assert data[1]["generic_name"] == "Ibuprofen"


def test_get_medications_search(client, auth_headers, test_medications):
    """Test searching medications"""
    # Search by generic name
    response = client.get("/api/meds/medications?q=Acetaminophen", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["generic_name"] == "Acetaminophen"

    # Search by brand name
    response = client.get("/api/meds/medications?q=Tylenol", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["brand_names"] == "Tylenol"

    # Search with no results
    response = client.get("/api/meds/medications?q=Nonexistent", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0


def test_get_medication_by_id(client, auth_headers, test_medications):
    """Test getting specific medication by ID"""
    med_id = test_medications[0].id
    response = client.get(f"/api/meds/medications/{med_id}", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["generic_name"] == "Acetaminophen"
    assert data["brand_names"] == "Tylenol"


def test_get_medication_not_found(client, auth_headers):
    """Test getting non-existent medication returns 404"""
    response = client.get("/api/meds/medications/999", headers=auth_headers)
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_get_medication_unauthenticated(client, test_medications):
    """Test getting specific medication without authentication fails"""
    med_id = test_medications[0].id
    response = client.get(f"/api/meds/medications/{med_id}")
    assert response.status_code == 401