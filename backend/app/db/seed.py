import sys
import os
from sqlalchemy.orm import Session

# Ensure app package is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models.user import User
from app.models.vehicle import Vehicle
from app.core.security import get_password_hash


def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check and seed Admin user
        admin = db.query(User).filter(User.email == "admin@dealership.com").first()
        if not admin:
            admin_user = User(
                email="admin@dealership.com",
                hashed_password=get_password_hash("admin123"),
                role="admin"
            )
            db.add(admin_user)

        # Check and seed Customer user
        customer = db.query(User).filter(User.email == "customer@dealership.com").first()
        if not customer:
            customer_user = User(
                email="customer@dealership.com",
                hashed_password=get_password_hash("customer123"),
                role="customer"
            )
            db.add(customer_user)

        # Check and seed vehicles with colors
        db.query(Vehicle).delete()
        vehicles = [
            Vehicle(make="Tesla", model="Model S Plaid", category="EV", color="Stealth Metallic Cyan", price=89990.0, quantity=3),
            Vehicle(make="Porsche", model="Taycan Turbo S", category="EV", color="Frozen Metallic Blue", price=150900.0, quantity=2),
            Vehicle(make="BMW", model="M5 Competition", category="sedan", color="Marina Bay Blue", price=107900.0, quantity=4),
            Vehicle(make="Mercedes-Benz", model="S-Class S580", category="sedan", color="Obsidian Black Metallic", price=117700.0, quantity=0), # Out of stock!
            Vehicle(make="Range Rover", model="Autobiography", category="SUV", color="Carpathian Grey", price=141100.0, quantity=5),
            Vehicle(make="Ford", model="F-150 Lightning", category="truck", color="Cyber Silver Metallic", price=54995.0, quantity=6),
            Vehicle(make="Rivian", model="R1T Launch Edition", category="truck", color="Compass Yellow Metallic", price=73000.0, quantity=1),
            Vehicle(make="Audi", model="RS Q8", category="SUV", color="Nardo Grey Metallic", price=125800.0, quantity=2),
            Vehicle(make="Porsche", model="911 GT3 RS", category="coupe", color="Sunset Amber Gold", price=223800.0, quantity=2),
        ]
        db.add_all(vehicles)

        db.commit()
        print("Database seeded successfully with vehicle colors and demo accounts!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
