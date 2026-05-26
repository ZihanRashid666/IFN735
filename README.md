# DOST DX Facility Management System — Phase 1

## Team
| Name | Role |
|---|---|
| Adithya Vignesh | Tech & Team Lead |
| Gugan Mani | UI/UX Design |
| Sharath Badrinath | Data Specialist |
| Hitesh | Backend Support |
| Augustin Robins | Team Support |

---

## Local Setup (First Time)

### 1. Clone the repository
```bash
git clone https://github.com/your-org/dost-fms.git
cd dost-fms
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Open `.env` and fill in your MySQL credentials and a JWT secret key.

### 4. Set up the database
Open MySQL and run:
```bash
mysql -u root -p < database/schema.sql
```
> Make sure your MySQL instance uses `utf8mb4` as the default charset.  
> If unsure, add this to your `my.cnf`: `character-set-server=utf8mb4`

### 5. Seed the first admin user
```bash
npm run seed
```
Default login credentials:
- **Email:** admin@dost.gov.ph
- **Password:** Admin@1234

> Change this password immediately after first login.

### 6. Start the development server
```bash
npm run dev
```
Server runs on: `http://localhost:5000`

---

## Project Structure
```
dost-fms/
├── backend/
│   ├── config/
│   │   └── db.js                  ← MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js      ← Login, logout, get profile
│   │   └── userController.js      ← User CRUD
│   ├── middleware/
│   │   ├── authenticate.js        ← JWT verification
│   │   └── authorise.js           ← Role-based access control
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   └── server.js                  ← Express app entry point
├── frontend/
│   ├── pages/
│   │   ├── login.html
│   │   ├── dashboard-admin.html
│   │   ├── dashboard-tech-admin.html
│   │   ├── dashboard-technician.html
│   │   ├── dashboard-staff.html
│   │   └── dashboard-management.html
│   ├── components/
│   │   └── sidebar.js
│   └── styles/
│       └── main.css
├── database/
│   └── schema.sql                 ← Full DB schema + seed data
├── run-seed.js                    ← Creates first admin account
├── .env.example
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/auth/login | No | All | Login, returns JWT |
| GET | /api/auth/me | Yes | All | Get current user profile |
| POST | /api/auth/logout | Yes | All | Logout |
| GET | /api/users | Yes | Admin Admin | List all users |
| POST | /api/users | Yes | Admin Admin | Create user |
| PUT | /api/users/:id | Yes | Admin Admin | Update user |
| PATCH | /api/users/:id/deactivate | Yes | Admin Admin | Deactivate user |
| PATCH | /api/users/:id/reset-password | Yes | Admin Admin | Reset password |

---

## Branch Strategy
- `main` — stable, production-ready. No direct pushes.
- `dev` — active integration branch.
- Feature branches: `feature/your-feature-name` → PR into `dev`.
