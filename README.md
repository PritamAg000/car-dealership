# Apex Motors — Car Dealership Inventory System

A full-stack Car Dealership Inventory System built with a Test-Driven Development (TDD) approach. The system provides a RESTful API powered by Python FastAPI and SQLite/PostgreSQL with SQLAlchemy 2.0 and Alembic, paired with a React, Vite, TypeScript, and Tailwind CSS single-page application. Users can register, log in, browse, filter, purchase, and manage luxury vehicle inventory in real-time.

---

## Tech Stack Summary

- **Backend**: Python 3.11+, FastAPI, SQLAlchemy 2.0, Alembic, SQLite / PostgreSQL, Pydantic v2, PyJWT, bcrypt, SlowAPI (rate limiting).
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React icons, React Router DOM v6.
- **Testing**: Pytest, Pytest-Cov, HTTPX TestClient (Backend), Vitest, React Testing Library, jsdom (Frontend).

---

## Setup Instructions

### 1. Prerequisites
- Python 3.11+ (or `py` launcher on Windows)
- Node.js 18+ and `npm`

### 2. Backend Setup
1. Open a terminal in the root directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     py -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Environment Configuration:
   Create a `.env` file inside `/backend` (referencing `.env.example` at root):
   ```env
   DATABASE_URL=sqlite:///./car_dealership.db
   JWT_SECRET_KEY=super-secret-jwt-key-change-in-production-123456789
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   ```
5. Run Alembic Database Migrations & Seed Script:
   ```bash
   alembic upgrade head
   python -m app.db.seed
   ```
6. Start the Backend API Server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000`.

### 3. Frontend Setup
1. Open a second terminal window in the root directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Frontend Development Server:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

---

## API Overview

Full endpoint documentation is available in [backend/API.md](file:///d:/project%20car/backend/API.md).

When the backend server is running, interactive documentation is available at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Screenshots

### Dashboard Gallery
![Dashboard Screenshot](https://raw.githubusercontent.com/placeholder/dashboard.png)

### User Login & Authentication
![Login Screenshot](https://raw.githubusercontent.com/placeholder/login.png)

### Admin Vehicle Management Modal
![Admin Add Modal Screenshot](https://raw.githubusercontent.com/placeholder/admin_modal.png)

---

## Test Report

Detailed coverage metrics are documented in [TEST_REPORT.md](file:///d:/project%20car/TEST_REPORT.md).

- **Backend**: **16 / 16 tests passing** with **94% code coverage** (`pytest --cov=app`).
- **Frontend**: **4 / 4 component tests passing** via Vitest.

To run tests locally:
- Backend: `cd backend && pytest --cov=app --cov-report=term-missing`
- Frontend: `cd frontend && npm run test`

---

## My AI Usage

### Tools used
- **Google Antigravity AI Assistant** (powered by Gemini 3.6 Flash High).
- **Git** version control with co-authorship trailers.
- **Pytest** & **Vitest** test harnesses.

### How I used them
- **Phase 0 & Scaffolding**: Generated project layout for `/backend` and `/frontend`, initialized `.gitignore`, `.env.example`, and baseline scripts.
- **TDD Test Generation (Red-Green-Refactor)**: AI created failing Pytest test suites first for User & Vehicle models, authentication routes (`/api/auth`), vehicle CRUD (`/api/vehicles`), partial search (`/api/vehicles/search`), and atomic inventory movements (`/api/vehicles/{id}/purchase` with row locking).
- **Backend Hardening**: AI configured rate limiting via `slowapi`, global Pydantic exception handlers, and generated `API.md`.
- **Frontend UI & Styling**: AI created a luxury dark dealership aesthetic with Tailwind CSS, AuthContext state management, search/filter bar, vehicle cards, and admin modals.
- **Verification**: Executed test suites and recorded execution logs in `PROMPTS.md` and `TEST_REPORT.md`.

### Reflection
*(Developer's personal reflection on how AI tools impacted engineering velocity, TDD discipline, and software architecture during the kata)*

---

## Project Structure

```text
.
├── .env.example
├── .gitignore
├── PROMPTS.md
├── README.md
├── TEST_REPORT.md
├── backend/
│   ├── alembic/
│   ├── app/
│   │   ├── core/           # Config & JWT Security helpers
│   │   ├── crud/           # Database access layer
│   │   ├── db/             # Base, Session & Seed script
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── routers/        # FastAPI route handlers & dependencies
│   │   ├── schemas/        # Pydantic request/response models
│   │   └── main.py         # FastAPI application entry point
│   ├── tests/              # Pytest test suite
│   ├── API.md              # API Specs
│   ├── alembic.ini
│   ├── pytest.ini
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/     # React UI components (Cards, Navbar, Modals)
    │   ├── context/        # AuthContext & useAuth hook
    │   ├── pages/          # Login, Register, Dashboard pages
    │   ├── services/       # Typed Fetch API client
    │   ├── tests/          # Vitest component tests
    │   ├── types/          # TypeScript interface definitions
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts
```
