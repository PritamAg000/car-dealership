# 🏎️ Apex Luxury Motors — Full-Stack Car Dealership & Inventory System

[![Live Website](https://img.shields.io/badge/🌐_Live_Demo-Apex_Luxury_Motors-FFB800?style=for-the-badge&logo=vercel)](https://car-dealership-three-chi.vercel.app/)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/PritamAg000/car-dealership)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)

An enterprise-grade, full-stack luxury car dealership web application built with **React 18**, **TypeScript**, **Tailwind CSS**, **FastAPI**, **SQLAlchemy**, and **Alembic**.

---

## 🌐 Live Website Demo & Cloud Deployment
- **Frontend App**: 👉 **[Open Apex Luxury Motors Live Web App](https://car-dealership-three-chi.vercel.app/)**
- **Deploy Cloud Backend**: 👉 **[Deploy Backend on Render](https://render.com/deploy?repo=https://github.com/PritamAg000/car-dealership)**

---

## 🌟 Main Project Features & Key Entry Points

When exploring this repository on GitHub or running it locally, here are the main files to check:

| Component | Main File Path | Description |
|---|---|---|
| 📄 **Project Overview** | [`README.md`](./README.md) | Front page documentation rendered automatically on GitHub. |
| 💻 **Frontend Web App Entry** | [`frontend/src/App.tsx`](./frontend/src/App.tsx) | Main React Router application wrapper & authentication context. |
| 🚘 **Main Inventory Dashboard** | [`frontend/src/pages/Dashboard.tsx`](./frontend/src/pages/Dashboard.tsx) | Full gallery grid, search filters, payment checkout trigger, and receipt modal. |
| 💳 **Payment Checkout Modal** | [`frontend/src/components/PaymentCheckoutModal.tsx`](./frontend/src/components/PaymentCheckoutModal.tsx) | Multi-tab escrow checkout (Credit Card, Bank Wire, Crypto BTC Wallet) with delivery registration. |
| 🛠️ **Admin Vehicle Modal** | [`frontend/src/components/AdminVehicleModal.tsx`](./frontend/src/components/AdminVehicleModal.tsx) | Admin controls for Make, Model, Category, Paint Finish, Stock Count, and Custom Photo URL with live preview. |
| ⚙️ **Backend API Server** | [`backend/app/main.py`](./backend/app/main.py) | FastAPI application entry point with CORS, Alembic database setup, and routers. |
| 🚗 **Vehicle API Endpoints** | [`backend/app/routers/vehicles.py`](./backend/app/routers/vehicles.py) | REST API endpoints for inventory search, CRUD actions, atomic stock purchase, and restocking. |

---

## 🚀 How to Run the Project Locally

### 1. Run the Frontend App
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser to view the live web app!

### 2. Run the Backend API Server
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```
Interactive API documentation will be available at **`http://127.0.0.1:8000/docs`**.

---

## 🔐 Demo Credentials

- **Admin Account**: `admin@dealership.com` / `admin123`
- **Customer Account**: `customer@dealership.com` / `customer123`
