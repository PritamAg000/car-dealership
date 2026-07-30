from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class VehicleBase(BaseModel):
    make: str
    model: str
    category: str
    color: Optional[str] = "Midnight Metallic Navy"
    price: float = Field(..., ge=0, description="Price must be non-negative")
    quantity: int = Field(..., ge=0, description="Quantity must be non-negative")


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    make: Optional[str] = None
    model: Optional[str] = None
    category: Optional[str] = None
    color: Optional[str] = None
    price: Optional[float] = Field(None, ge=0)
    quantity: Optional[int] = Field(None, ge=0)


class VehicleRead(VehicleBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class VehiclePurchase(BaseModel):
    quantity: Optional[int] = Field(1, ge=1)


class VehicleRestock(BaseModel):
    quantity: int = Field(..., ge=1)
