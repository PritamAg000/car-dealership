import pytest
from fastapi.testclient import TestClient
from app.core.security import create_access_token
from app.models.user import User


@pytest.fixture
def customer_token(db):
    user = User(email="inv_cust@example.com", hashed_password="pw", role="customer")
    db.add(user)
    db.commit()
    db.refresh(user)
    return f"Bearer {create_access_token(subject=user.id, role=user.role)}"


@pytest.fixture
def admin_token(db):
    user = User(email="inv_admin@example.com", hashed_password="pw", role="admin")
    db.add(user)
    db.commit()
    db.refresh(user)
    return f"Bearer {create_access_token(subject=user.id, role=user.role)}"


def test_purchase_vehicle_success(client: TestClient, customer_token: str, admin_token: str):
    create_res = client.post(
        "/api/vehicles",
        json={"make": "Porsche", "model": "911", "category": "coupe", "price": 120000, "quantity": 2},
        headers={"Authorization": admin_token}
    )
    v_id = create_res.json()["id"]

    purch_res = client.post(
        f"/api/vehicles/{v_id}/purchase",
        json={"quantity": 1},
        headers={"Authorization": customer_token}
    )
    assert purch_res.status_code == 200
    assert purch_res.json()["quantity"] == 1


def test_purchase_out_of_stock_returns_409(client: TestClient, customer_token: str, admin_token: str):
    create_res = client.post(
        "/api/vehicles",
        json={"make": "Mazda", "model": "MX-5", "category": "roadster", "price": 30000, "quantity": 0},
        headers={"Authorization": admin_token}
    )
    v_id = create_res.json()["id"]

    purch_res = client.post(
        f"/api/vehicles/{v_id}/purchase",
        json={"quantity": 1},
        headers={"Authorization": customer_token}
    )
    assert purch_res.status_code == 409
    assert "stock" in purch_res.json()["detail"].lower() or "insufficient" in purch_res.json()["detail"].lower()


def test_restock_admin_only(client: TestClient, customer_token: str, admin_token: str):
    create_res = client.post(
        "/api/vehicles",
        json={"make": "Toyota", "model": "Supra", "category": "coupe", "price": 55000, "quantity": 1},
        headers={"Authorization": admin_token}
    )
    v_id = create_res.json()["id"]

    # Customer restock -> 403
    cust_res = client.post(
        f"/api/vehicles/{v_id}/restock",
        json={"quantity": 5},
        headers={"Authorization": customer_token}
    )
    assert cust_res.status_code == 403

    # Admin restock -> 200
    admin_res = client.post(
        f"/api/vehicles/{v_id}/restock",
        json={"quantity": 5},
        headers={"Authorization": admin_token}
    )
    assert admin_res.status_code == 200
    assert admin_res.json()["quantity"] == 6
