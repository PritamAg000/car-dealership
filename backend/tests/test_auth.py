import pytest
from fastapi.testclient import TestClient
from app.core.security import create_access_token


def test_register_user_success(client: TestClient):
    response = client.post(
        "/api/auth/register",
        json={"email": "newuser@example.com", "password": "securepassword123"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["role"] == "customer"
    assert "id" in data
    assert "hashed_password" not in data


def test_register_duplicate_email(client: TestClient):
    client.post(
        "/api/auth/register",
        json={"email": "duplicate@example.com", "password": "password123"}
    )
    response = client.post(
        "/api/auth/register",
        json={"email": "duplicate@example.com", "password": "password123"}
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Email already registered"


def test_register_invalid_email(client: TestClient):
    response = client.post(
        "/api/auth/register",
        json={"email": "invalid-email-format", "password": "password123"}
    )
    assert response.status_code == 422


def test_login_success(client: TestClient):
    client.post(
        "/api/auth/register",
        json={"email": "loginuser@example.com", "password": "mypassword123"}
    )
    response = client.post(
        "/api/auth/login",
        json={"email": "loginuser@example.com", "password": "mypassword123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "loginuser@example.com"


def test_login_invalid_credentials(client: TestClient):
    client.post(
        "/api/auth/register",
        json={"email": "validuser@example.com", "password": "mypassword123"}
    )
    response = client.post(
        "/api/auth/login",
        json={"email": "validuser@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


def test_invalid_or_missing_token(client: TestClient):
    # Endpoint needing auth will be added, for now test bogus token decoding
    bogus_token = "Bearer invalid.jwt.token"
    response = client.get("/api/vehicles", headers={"Authorization": bogus_token})
    # Since /api/vehicles route is created in Phase 3, this is tested there
