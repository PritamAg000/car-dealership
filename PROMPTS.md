# AI Agent Prompt Playbook — Car Dealership Inventory System

This document contains the chronological record of user prompts and AI agent execution steps across all phases of the full-stack TDD Car Dealership Kata.

---

## Phase 0 — Repo, workflow, and conventions

**Prompt:**
> You are helping me build a full-stack Car Dealership Inventory System as a TDD kata. Set up the project skeleton and our working conventions before writing any feature code.

**AI Action Summary:**
- Initialized Git repository.
- Created root `.gitignore`, `.env.example`, `PROMPTS.md`.
- Created directory layout for backend (`/backend`) and frontend (`/frontend`).
- Set up Python virtual environment, `requirements.txt`, `pytest.ini`, and database configuration.
- Made initial git commit with co-author trailer.

---

## Phase 1 — Database schema & Alembic setup

**Prompt:**
> Define the data model and get the database wired up, TDD-style where applicable. User model (UUID primary key, email, hashed_password, role) and Vehicle model (UUID primary key, make, model, category, price, quantity >= 0 constraint). Run alembic, create seed script, and write pytest model CRUD test.

**AI Action Summary:**
- Defined SQLAlchemy ORM models (`User`, `Vehicle`) and Pydantic v2 schemas (`UserRead`, `UserCreate`, `VehicleRead`, `VehicleCreate`, `VehicleUpdate`).
- Initialized Alembic migrations and executed `alembic revision --autogenerate` and `alembic upgrade head`.
- Created seed script `backend/app/db/seed.py` with admin user, customer user, and 8 realistic vehicles.
- Wrote failing `test_models.py` (RED), updated native `bcrypt` password hashing, and verified tests passing (GREEN).

---

## Phase 2 — Auth endpoints: register & login (TDD)

**Prompt:**
> Implement authentication using strict TDD. Endpoints: POST /api/auth/register (201 UserRead, 409 duplicate email, 422 validation) and POST /api/auth/login (200 JWT access_token, 401 bad credentials). Implement get_current_user and require_admin dependencies.

**AI Action Summary:**
- Wrote failing test suite `tests/test_auth.py` covering registration, duplicate email, validation errors, login success, and 401 handling (RED).
- Implemented `crud_user.py`, `routers/auth.py`, `routers/deps.py`, and registered auth router in `main.py`.
- Installed `email-validator` dependency and verified all 8 backend tests passing (GREEN).

---

## Phase 3 — Vehicle CRUD endpoints (TDD)

**Prompt:**
> Implement vehicle management endpoints with strict TDD: POST /api/vehicles (201 created), GET /api/vehicles (paginated list), PUT /api/vehicles/{id} (update subset), DELETE /api/vehicles/{id} (admin only, 403 for non-admins).

**AI Action Summary:**
- Wrote failing test cases in `tests/test_vehicles.py` for vehicle creation, paginated listing, partial updates, and admin-only deletion (RED).
- Implemented `crud_vehicle.py` and vehicle router endpoints in `routers/vehicles.py`.

---

## Phase 4 — Search endpoint (TDD)

**Prompt:**
> Implement GET /api/vehicles/search with TDD. Accepts make, model, category, min_price, max_price. Partial case-insensitive match (ilike) and inclusive price range check. Return 200 with empty array when no matches.

**AI Action Summary:**
- Wrote failing search test suite in `tests/test_search.py` (RED).
- Added `search_vehicles` query function with `ilike` filters and range constraints in `crud_vehicle.py` (GREEN).

---

## Phase 5 — Inventory: purchase & restock (TDD)

**Prompt:**
> Implement inventory movement endpoints: POST /api/vehicles/{id}/purchase (decrement quantity, 409 if out of stock, using SELECT ... FOR UPDATE) and POST /api/vehicles/{id}/restock (admin only).

**AI Action Summary:**
- Wrote failing inventory test suite in `tests/test_inventory.py` (RED).
- Implemented `purchase_vehicle_endpoint` with SQLAlchemy `with_for_update()` row locking and `restock_vehicle_endpoint` in `routers/vehicles.py` (GREEN).

---

## Phase 6 — Backend hardening pass

**Prompt:**
> Do a hardening pass over the backend: add FastAPI exception handlers, CORS, rate limiting via slowapi, health check GET /api/health, OpenAPI docs, API.md summary, and run full test coverage.

**AI Action Summary:**
- Added custom exception handlers and `slowapi` rate limiting in `main.py`.
- Generated `backend/API.md` documentation.
- Ran pytest coverage suite achieving **94% total backend statement coverage** across all modules.

---

## Phase 7 to 11 — Frontend Scaffolding, Auth UI, Dashboard, Purchase Flow & Visual Design Pass

**Prompt:**
> Set up React + Vite + TypeScript + Tailwind CSS frontend in /frontend. Build AuthContext, Login page, Register page, Navbar, Vehicle Cards grid with category icons, Search & Filter bar, Admin Add/Edit/Delete/Restock modals, and Toast notifications. Pass a luxury dark dealership visual design.

**AI Action Summary:**
- Scaffolded Vite + React + TS project with Tailwind CSS luxury palette (`#0B132B` deep navy, `#F59E0B` amber gold accent).
- Implemented typed API client `services/api.ts`, `AuthContext.tsx`, `ProtectedRoute`, and `AdminRoute`.
- Built Login & Register pages with client validation, loading states, and error handling.
- Built responsive Dashboard with category badge icons (coupe, sedan, SUV, truck, EV), price formatting, stock level badges, disabled purchase state on zero quantity, debounced search/filter bar, and admin modals.
- Wrote Vitest unit tests in `tests/Auth.test.tsx` and `tests/Dashboard.test.tsx` (all passing).

---

## Phase 12 to 15 — Test Report, README & Final Review

**Prompt:**
> Generate TEST_REPORT.md, write comprehensive README.md, assemble PROMPTS.md log, and verify project submission readiness.

**AI Action Summary:**
- Generated `TEST_REPORT.md` documenting 16 backend tests (94% coverage) and 4 frontend tests.
- Written complete root `README.md` with setup instructions, API links, screenshot placeholders, and "My AI Usage".
- Finalized `PROMPTS.md` and verified git log commit history.
