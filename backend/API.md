# Car Dealership Inventory System — API Documentation

Interactive Swagger documentation is available at `/docs` and ReDoc at `/redoc` when the backend server is running.

## Base URL
`http://localhost:8000/api`

---

## Authentication Endpoints

### 1. Register User
- **Method & Route**: `POST /api/auth/register`
- **Auth Required**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": "uuid-string",
    "email": "user@example.com",
    "role": "customer",
    "created_at": "2026-07-30T12:00:00Z"
  }
  ```
- **Error Responses**:
  - `409 Conflict`: Email already registered.
  - `422 Unprocessable Entity`: Validation failure.

### 2. Login User
- **Method & Route**: `POST /api/auth/login`
- **Auth Required**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "access_token": "jwt-token-string",
    "token_type": "bearer",
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "role": "customer",
      "created_at": "2026-07-30T12:00:00Z"
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid email or password.

---

## Vehicle Endpoints

### 3. List Vehicles
- **Method & Route**: `GET /api/vehicles`
- **Auth Required**: Bearer JWT
- **Query Params**: `page` (default 1), `limit` (default 10)
- **Response (200 OK)**: Array of Vehicle objects.

### 4. Search Vehicles
- **Method & Route**: `GET /api/vehicles/search`
- **Auth Required**: Bearer JWT
- **Query Params**: `make`, `model`, `category`, `min_price`, `max_price`
- **Response (200 OK)**: Array of matching Vehicle objects.

### 5. Add Vehicle
- **Method & Route**: `POST /api/vehicles`
- **Auth Required**: Bearer JWT
- **Request Body**:
  ```json
  {
    "make": "Porsche",
    "model": "911 GT3",
    "category": "coupe",
    "price": 180000.0,
    "quantity": 3
  }
  ```
- **Response (201 Created)**: Created Vehicle object.

### 6. Update Vehicle
- **Method & Route**: `PUT /api/vehicles/{id}`
- **Auth Required**: Bearer JWT
- **Request Body**: Partial vehicle fields (`make`, `model`, `category`, `price`, `quantity`).
- **Response (200 OK)**: Updated Vehicle object.

### 7. Delete Vehicle
- **Method & Route**: `DELETE /api/vehicles/{id}`
- **Auth Required**: Bearer JWT (Admin only)
- **Response (204 No Content)**

---

## Inventory Endpoints

### 8. Purchase Vehicle
- **Method & Route**: `POST /api/vehicles/{id}/purchase`
- **Auth Required**: Bearer JWT
- **Request Body** (optional):
  ```json
  {
    "quantity": 1
  }
  ```
- **Response (200 OK)**: Updated Vehicle object with decremented stock.
- **Error Responses**:
  - `409 Conflict`: Insufficient stock available for purchase.

### 9. Restock Vehicle
- **Method & Route**: `POST /api/vehicles/{id}/restock`
- **Auth Required**: Bearer JWT (Admin only)
- **Request Body**:
  ```json
  {
    "quantity": 5
  }
  ```
- **Response (200 OK)**: Updated Vehicle object with incremented stock.

---

## Health Check

### 10. Health Status
- **Method & Route**: `GET /api/health`
- **Auth Required**: None
- **Response (200 OK)**: `{"status": "ok"}`
