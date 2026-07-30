from typing import Optional
from pydantic import BaseModel, Field

class VehicleBase(BaseModel):
    make: str = Field(..., example="Tesla")
    model: str = Field(..., example="Model S")
    category: str = Field(..., example="EV")
    color: Optional[str] = Field(default="Midnight Metallic Navy", example="Stealth Metallic Cyan")
    image_url: Optional[str] = Field(default=None, example="https://images.unsplash.com/photo-1617788138017-80ad40651399")
    price: float = Field(..., gt=0, example=89990.0)
    quantity: int = Field(..., ge=0, example=5)

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    make: Optional[str] = None
    model: Optional[str] = None
    category: Optional[str] = None
    color: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)

class VehiclePurchase(BaseModel):
    quantity: int = Field(default=1, gt=0, example=1)

class VehicleRestock(BaseModel):
    quantity: int = Field(..., gt=0, example=5)

class VehicleRead(VehicleBase):
    id: str

    class Config:
        from_attributes = True
