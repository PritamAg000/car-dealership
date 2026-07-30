from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate, VehicleUpdate


def get_vehicle_by_id(db: Session, vehicle_id: str, for_update: bool = False) -> Optional[Vehicle]:
    query = db.query(Vehicle).filter(Vehicle.id == vehicle_id)
    if for_update:
        query = query.with_for_update()
    return query.first()


def get_vehicles(db: Session, skip: int = 0, limit: int = 100) -> List[Vehicle]:
    return db.query(Vehicle).offset(skip).limit(limit).all()


def search_vehicles(
    db: Session,
    make: Optional[str] = None,
    model: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
) -> List[Vehicle]:
    query = db.query(Vehicle)

    if make:
        query = query.filter(Vehicle.make.ilike(f"%{make}%"))
    if model:
        query = query.filter(Vehicle.model.ilike(f"%{model}%"))
    if category:
        query = query.filter(Vehicle.category.ilike(f"%{category}%"))
    if min_price is not None:
        query = query.filter(Vehicle.price >= min_price)
    if max_price is not None:
        query = query.filter(Vehicle.price <= max_price)

    return query.all()


def create_vehicle(db: Session, vehicle_in: VehicleCreate) -> Vehicle:
    db_vehicle = Vehicle(
        make=vehicle_in.make,
        model=vehicle_in.model,
        category=vehicle_in.category,
        price=vehicle_in.price,
        quantity=vehicle_in.quantity,
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


def update_vehicle(db: Session, db_vehicle: Vehicle, vehicle_in: VehicleUpdate) -> Vehicle:
    update_data = vehicle_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_vehicle, field, value)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


def delete_vehicle(db: Session, db_vehicle: Vehicle) -> None:
    db.delete(db_vehicle)
    db.commit()
