import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, CheckConstraint
from app.db.base import Base


class Vehicle(Base):
    __tablename__ = "vehicles"
    __table_args__ = (
        CheckConstraint("quantity >= 0", name="check_quantity_non_negative"),
    )

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    make = Column(String(100), nullable=False)
    model = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    color = Column(String(50), nullable=True, default="Midnight Metallic Navy")
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
