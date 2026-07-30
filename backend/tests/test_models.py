import pytest
from app.models.user import User
from app.models.vehicle import Vehicle
from app.core.security import get_password_hash


def test_create_user(db):
    user = User(
        email="testuser@example.com",
        hashed_password=get_password_hash("password123"),
        role="customer"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    assert user.id is not None
    assert user.email == "testuser@example.com"
    assert user.role == "customer"


def test_create_vehicle(db):
    vehicle = Vehicle(
        make="Porsche",
        model="911 GT3",
        category="coupe",
        price=180000.0,
        quantity=2
    )
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    assert vehicle.id is not None
    assert vehicle.make == "Porsche"
    assert vehicle.model == "911 GT3"
    assert vehicle.price == 180000.0
    assert vehicle.quantity == 2
