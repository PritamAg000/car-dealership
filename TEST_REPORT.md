# Test Coverage Report — Car Dealership Inventory System

## Executive Summary

| Layer | Framework | Total Tests | Passed | Failed | Code Coverage % |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Backend** | Pytest + HTTPX + Pytest-Cov | 16 | 16 | 0 | **94%** |
| **Frontend** | Vitest + React Testing Library | 4 | 4 | 0 | **Components & Auth Verified** |
| **Total** | Full-Stack Test Suite | 20 | 20 | 0 | **94% Core Business Logic** |

---

## 1. Backend Test Coverage Output (`pytest --cov=app`)

**Coverage Location**: `backend/htmlcov/index.html` (generated via `pytest --cov-report=html`)

```text
=============================== tests coverage ================================
Name                       Stmts   Miss  Cover   Missing
--------------------------------------------------------
app\core\config.py            11      0   100%
app\core\security.py          21      3    86%   14-15, 27
app\crud\crud_user.py         22      1    95%   31
app\crud\crud_vehicle.py      41      2    95%   32, 34
app\db\base.py                 3      0   100%
app\db\session.py             11      4    64%   18-22
app\main.py                   24      1    96%   52
app\models\__init__.py         3      0   100%
app\models\user.py            11      0   100%
app\models\vehicle.py         15      0   100%
app\routers\auth.py           21      0   100%
app\routers\deps.py           26      2    92%   24, 30
app\routers\vehicles.py       53      4    92%   77, 92, 112, 138
app\schemas\user.py           18      0   100%
app\schemas\vehicle.py        26      0   100%
--------------------------------------------------------
TOTAL                        306     17    94%
======================= 16 passed, 3 warnings in 2.32s ========================
```

---

## 2. Frontend Test Output (`vitest run --coverage`)

```text
 RUN  v1.6.1 D:/project car/frontend
      Coverage enabled with v8

 ✓ src/tests/Auth.test.tsx  (2 tests)
 ✓ src/tests/Dashboard.test.tsx  (2 tests)

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  13:13:57
   Duration  2.19s
```
