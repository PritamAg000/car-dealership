import pytest
from fastapi.testclient import TestClient
from app.core.security import create_access_token
from app.models.user import User


@pytest.fixture
def auth_token(db):
    user = User(email="search_user@example.com", hashed_password="pw", role="customer")
    db.add(user)
    db.commit()
    db.refresh(user)
    return f"Bearer {create_access_token(subject=user.id, role=user.role)}"


def test_search_vehicles_filtered(client: TestClient, auth_token: str):
    # Setup test vehicles
    client.post(
        "/api/vehicles",
        json={"make": "Ferrari", "model": "F8 Tributo", "category": "coupe", "price": 280000, "quantity": 1},
        headers={"Authorization": auth_token}
    )
    client.post(
        "/api/vehicles",
        json={"make": "Lamborghini", "model": "Huracan", "category": "coupe", "price": 240000, "quantity": 2},
        headers={"Authorization": auth_token}
    )

    # Partial case-insensitive search by make
    res = client.get("/api/vehicles/search?make=ferr", headers={"Authorization": auth_token})
    assert res.status_code == 200
    results = res.json()
    assert len(results) == 1
    assert results[0]["make"] == "Ferrari"

    # Price range filter
    res = client.get("/api/vehicles/search?min_price=200000&max_price=250000", headers={"Authorization": auth_token})
    assert res.status_code == 200
    results = res.json()
    assert len(results) == 1
    assert results[0]["make"] == "Lamborghini"

    # No matches return empty list
    res = client.get("/api/vehicles/search?make=NonExistent", headers={"Authorization": auth_token})
    assert res.status_code == 200
    assert res.json() == []
