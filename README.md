# Subscription-Based Content API

A backend API that provides **subscription-based access control** for premium content.

Users can register, authenticate using **JWT**, upgrade their subscription, and access protected content based on their subscription status. Premium access automatically expires after **30 days**.

This project was built as part of the **GDG on Campus SRM Technical Recruitment Task**.

---

# Features

* User registration
* Secure login with **JWT authentication**
* Password hashing using **bcrypt**
* **PostgreSQL database integration**
* Free vs Premium user roles
* Protected premium content routes
* Subscription upgrade endpoint (simulated payment)
* **Automatic 30-day subscription expiration**
* Premium content access logging
* Admin endpoint to view access logs
* **Environment variable configuration using dotenv**

---

# Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JSON Web Tokens (JWT)**
* **bcrypt.js**
* **dotenv**
* **Docker**

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
├── screenshots
│
├── .env.example
├── .gitignore
├── Dockerfile
├── .dockerignore
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

# Environment Configuration

Create a `.env` file in the project root.

Example `.env` configuration:

```
PORT=3000
JWT_SECRET=your_jwt_secret

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=subscription_api
```

A template file **`.env.example`** is included in the repository.

---

# PostgreSQL Database Setup

Create a database:

```
CREATE DATABASE subscription_api;
```

Create the **users table**:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'free',
    subscription_expires TIMESTAMP
);
```

---

# Run the Server (Local)

```
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

# Run Using Docker

Docker allows the API to run inside a container without installing dependencies manually.

## 1. Build the Docker image

```
docker build -t subscription-api .
```

---

## 2. Run the Docker container

```
docker run -p 3000:3000 --env-file .env subscription-api
```

---

## 3. Access the API

Open:

```
http://localhost:3000
```

The server will start inside a Docker container.

---

# Testing the API

You can test the API using:

* **Postman**
* **curl**
* any API testing client

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

Upgrades a user from **Free → Premium** and sets a **30-day subscription expiration**.

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

Accessible **only to Premium users with a valid subscription**.

If the subscription has expired, access will be denied.

---

## View Access Logs (Admin)

```
GET /admin/logs
```

Returns premium content access logs.

Example:

```
User 1 accessed premium content at 2026-03-12T13:36:39.958Z
```

---

# Activity Logging

Every time premium content is accessed, an entry is written to:

```
logs/access.log
```

This enables monitoring of **premium content usage**.

---

# Optional Enhancements Implemented

* Admin endpoint to view access logs
* PostgreSQL database integration
* **30-day subscription expiration**
* **Environment variable configuration using dotenv**
* **Docker containerization**

---

# Future Improvements

* Payment gateway integration
* Subscription renewal system
* Usage analytics dashboard
* Database migrations

---

# Author

GR Hemanth

GitHub:
[https://github.com/gr-hemanth](https://github.com/gr-hemanth)

---

# License

This project is created for **educational and recruitment task purposes**.
