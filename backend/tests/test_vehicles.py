import pytest
from fastapi.testclient import TestClient
from app.core.security import create_access_token
from app.models.user import User


@pytest.fixture
def customer_token(db):
    user = User(email="cust_test@example.com", hashed_password="pw", role="customer")
    db.add(user)
    db.commit()
    db.refresh(user)
    return f"Bearer {create_access_token(subject=user.id, role=user.role)}"


@pytest.fixture
def admin_token(db):
    user = User(email="admin_test@example.com", hashed_password="pw", role="admin")
    db.add(user)
    db.commit()
    db.refresh(user)
    return f"Bearer {create_access_token(subject=user.id, role=user.role)}"


def test_create_vehicle_authenticated(client: TestClient, customer_token: str):
    response = client.post(
        "/api/vehicles",
        json={
            "make": "Audi",
            "model": "RS6 Avant",
            "category": "wagon",
            "price": 125000.0,
            "quantity": 3
        },
        headers={"Authorization": customer_token}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["make"] == "Audi"
    assert data["model"] == "RS6 Avant"
    assert "id" in data


def test_get_vehicles_paginated(client: TestClient, customer_token: str):
    client.post(
        "/api/vehicles",
        json={"make": "Car1", "model": "M1", "category": "sedan", "price": 10000, "quantity": 1},
        headers={"Authorization": customer_token}
    )
    response = client.get("/api/vehicles?page=1&limit=5", headers={"Authorization": customer_token})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


def test_update_vehicle(client: TestClient, customer_token: str):
    create_resp = client.post(
        "/api/vehicles",
        json={"make": "Ford", "model": "Mustang", "category": "coupe", "price": 45000, "quantity": 2},
        headers={"Authorization": customer_token}
    )
    v_id = create_resp.json()["id"]

    response = client.put(
        f"/api/vehicles/{v_id}",
        json={"price": 42000.0, "quantity": 5},
        headers={"Authorization": customer_token}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["price"] == 42000.0
    assert data["quantity"] == 5


def test_delete_vehicle_admin_only(client: TestClient, customer_token: str, admin_token: str):
    create_resp = client.post(
        "/api/vehicles",
        json={"make": "Lexus", "model": "LFA", "category": "coupe", "price": 375000, "quantity": 1},
        headers={"Authorization": admin_token}
    )
    v_id = create_resp.json()["id"]

    # Customer gets 403
    cust_resp = client.delete(f"/api/vehicles/{v_id}", headers={"Authorization": customer_token})
    assert cust_resp.status_code == 403

    # Admin gets 204
    admin_resp = client.delete(f"/api/vehicles/{v_id}", headers={"Authorization": admin_token})
    assert admin_resp.status_code == 204
