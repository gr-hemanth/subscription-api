# Subscription-Based Content API

A backend API that provides **subscription-based access control** for premium content.

Users can register, authenticate using JWT, upgrade their subscription, and access protected content based on their subscription status.

This project was built as part of the **GDG on Campus SRM Technical Recruitment Task**.

---

# Features

* User Registration
* Secure Login using **JWT Authentication**
* Password hashing using **bcrypt**
* **PostgreSQL database integration**
* Free and Premium subscription roles
* Protected premium content routes
* Subscription upgrade endpoint (simulated payment)
* Premium content access logging
* Admin endpoint to view access logs

---

# Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JSON Web Tokens (JWT)
* bcrypt.js
* File System (for access logging)

---

# Project Structure

```
subscription-api
│
├── routes
│   ├── authRoutes.js
│   ├── contentRoutes.js
│   └── adminRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   └── premiumMiddleware.js
│
├── config
│   └── db.js
│
├── logs
│   └── access.log
│
├── server.js
├── package.json
└── README.md
```

---

# Installation and Setup

## 1. Clone the repository

```
git clone https://github.com/gr-hemanth/subscription-api.git
```

---

## 2. Navigate to the project folder

```
cd subscription-api
```

---

## 3. Install dependencies

```
npm install
```

---

## 4. Setup PostgreSQL Database

Create a PostgreSQL database.

Example:

```
CREATE DATABASE subscription_api;
```

Create the **users table**:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    subscription VARCHAR(20) DEFAULT 'free'
);
```

---

## 5. Configure Database Connection

Update your database configuration in `db.js` or environment variables.

Example:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=subscription_api
```

---

## 6. Start the Server

```
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

# Testing the API

Example requests can be tested using **Postman**, **curl**, or any API client.

---

# API Endpoints

## Register User

```
POST /auth/register
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

## Login User

```
POST /auth/login
```

Returns a **JWT authentication token**.

---

## Upgrade Subscription

```
POST /auth/upgrade
```

Request body:

```json
{
  "email": "user@example.com"
}
```

Upgrades the user from **Free → Premium**.

---

## Access Free Content

```
GET /content/free
```

Header:

```
Authorization: Bearer <token>
```

Accessible by **all authenticated users**.

---

## Access Premium Content

```
GET /content/premium
```

Header:

```
Authorization: Bearer <token>
```

Accessible **only to Premium users**.

---

## View Access Logs (Admin)

```
GET /admin/logs
```

Returns premium content access logs.

Example log entry:

```
User 1 accessed premium content at 2026-03-12T13:36:39.958Z
```

---

# Activity Logging

Whenever a user accesses premium content, an entry is written to:

```
logs/access.log
```

This helps track **premium content usage**.

---

# Optional Enhancements Implemented

* Admin endpoint to view access logs
* PostgreSQL database integration

---

# Future Improvements

* Subscription expiration (30 days)
* Payment gateway integration
* Usage analytics dashboard
* Docker containerization
* Database migrations

---

# Author

Hemanth
GitHub: https://github.com/gr-hemanth

---

# License

This project is created for **educational and recruitment task purposes**.
