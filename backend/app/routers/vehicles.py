from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.routers.deps import get_current_user, require_admin
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
    VehicleRead,
    VehiclePurchase,
    VehicleRestock,
)
from app.crud.crud_vehicle import (
    get_vehicle_by_id,
    get_vehicles,
    search_vehicles,
    create_vehicle,
    update_vehicle,
    delete_vehicle,
)

router = APIRouter(prefix="/api/vehicles", tags=["Vehicles"])


@router.post("", response_model=VehicleRead, status_code=status.HTTP_201_CREATED)
def add_vehicle(
    vehicle_in: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Note: Decision made to allow any authenticated user to create a vehicle per Kata prompt option.
    return create_vehicle(db, vehicle_in=vehicle_in)


@router.get("", response_model=List[VehicleRead])
def list_vehicles(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skip = (page - 1) * limit
    return get_vehicles(db, skip=skip, limit=limit)


@router.get("/search", response_model=List[VehicleRead])
def search_vehicles_endpoint(
    make: Optional[str] = Query(None),
    model: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return search_vehicles(
        db,
        make=make,
        model=model,
        category=category,
        min_price=min_price,
        max_price=max_price,
    )


@router.put("/{vehicle_id}", response_model=VehicleRead)
def update_vehicle_endpoint(
    vehicle_id: str,
    vehicle_in: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_vehicle = get_vehicle_by_id(db, vehicle_id=vehicle_id)
    if not db_vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )
    return update_vehicle(db, db_vehicle=db_vehicle, vehicle_in=vehicle_in)


@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle_endpoint(
    vehicle_id: str,
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_admin),
):
    db_vehicle = get_vehicle_by_id(db, vehicle_id=vehicle_id)
    if not db_vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )
    delete_vehicle(db, db_vehicle=db_vehicle)
    return None


@router.post("/{vehicle_id}/purchase", response_model=VehicleRead)
def purchase_vehicle_endpoint(
    vehicle_id: str,
    purchase_in: Optional[VehiclePurchase] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    qty_to_purchase = purchase_in.quantity if purchase_in else 1

    # Use row locking with_for_update inside transaction
    db_vehicle = get_vehicle_by_id(db, vehicle_id=vehicle_id, for_update=True)
    if not db_vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )

    if db_vehicle.quantity < qty_to_purchase:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Insufficient stock available for purchase"
        )

    db_vehicle.quantity -= qty_to_purchase
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


@router.post("/{vehicle_id}/restock", response_model=VehicleRead)
def restock_vehicle_endpoint(
    vehicle_id: str,
    restock_in: VehicleRestock,
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_admin),
):
    db_vehicle = get_vehicle_by_id(db, vehicle_id=vehicle_id, for_update=True)
    if not db_vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )

    db_vehicle.quantity += restock_in.quantity
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle
