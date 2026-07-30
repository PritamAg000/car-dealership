import uuid
from typing import Optional
from sqlalchemy import String, Integer, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    make: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    model: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    color: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, default="Midnight Metallic Navy")
    image_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
