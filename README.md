<div align="center">

# 🎬 FilmVerse

### A Full-Stack Movie Discovery Platform

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedatabase.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**[🌐 Live Demo](https://film-verse-ten.vercel.app)** · **[🐛 Report Bug](https://github.com/ShreeKumbhar/filmverse/issues)** · **[✨ Request Feature](https://github.com/ShreeKumbhar/filmverse/issues)**

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Database Verification](#-database-verification)
- [What This Project Demonstrates](#-what-this-project-demonstrates)
- [License](#-license)
- [Author](#-author)

---

## 🎯 About the Project

**FilmVerse** is a full-stack movie discovery web application that brings together a rich cinematic browsing experience with secure user authentication and personalized favorites management.

Powered by the **TMDB (The Movie Database) API**, FilmVerse delivers real-time movie data — posters, ratings, overviews, and release dates — through a clean React frontend connected to a robust Node.js/Express backend backed by MySQL.

> 💡 Built to demonstrate end-to-end full-stack development: from crafting responsive UIs to designing REST APIs, implementing JWT authentication, and managing relational databases.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Movie Discovery** | Browse and search movies across multiple categories |
| 🎬 **Movie Details** | View posters, overviews, ratings, and release dates |
| 🔐 **Secure Auth** | JWT-based signup, login, and password reset |
| ❤️ **Favorites** | Add and manage a personal list of favorite movies |
| 👤 **User Profile** | Protected profile page accessible post-login |
| 🗄️ **Persistence** | User data and favorites stored in a MySQL database |
| 📱 **Responsive UI** | Mobile-friendly layout with smooth React Router navigation |

---

## 🏗️ System Architecture

FilmVerse follows a classic **client-server architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│              React Frontend (localhost:3000)                 │
│         React Router · Axios · React Toastify · CSS         │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP Requests (Axios)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
│           Express API Server (localhost:5001)               │
│          JWT Auth · bcryptjs · Routes · Controllers         │
└────────────┬─────────────────────────────┬──────────────────┘
             │ SQL Queries                  │ HTTP (TMDB)
             ▼                             ▼
┌────────────────────────┐   ┌─────────────────────────────┐
│   MySQL Database       │   │        TMDB API             │
│  Users · Favorites     │   │  Movies · Posters · Ratings │
└────────────────────────┘   └─────────────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend**

| Library | Purpose |
|---|---|
| [React](https://reactjs.org/) | Component-based UI library |
| [React Router](https://reactrouter.com/) | Client-side navigation |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Notification system |
| CSS | Custom styling |

**Backend**

| Library | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | REST API framework |
| [JSON Web Tokens (JWT)](https://jwt.io/) | Stateless authentication |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Password hashing |

**Database**

| Tool | Purpose |
|---|---|
| [MySQL 8+](https://www.mysql.com/) via `mysql2` | Relational data storage |

**External API**

| API | Purpose |
|---|---|
| [TMDB API](https://developer.themoviedb.org/docs) | Movie data, metadata & posters |

**Dev Tools**

| Tool | Purpose |
|---|---|
| Git & GitHub | Version control |
| Postman | API testing & debugging |
| npm | Package management |

---

## 📂 Project Structure

```
filmverse/
│
├── Backend/                        # Express API server
│   ├── controllers/                # Route handler logic
│   ├── routes/                     # API route definitions
│   ├── middleware/                 # Auth middleware (JWT verification)
│   ├── db/                         # MySQL connection config
│   ├── server.js                   # Entry point
│   └── .env.example                # Environment variable template
│
├── Frontend/                       # React application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Page-level components
│   │   └── App.js                  # Root component with routing
│   └── .env                        # Frontend environment variables
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed before proceeding:

| Tool | Version | Link |
|---|---|---|
| Node.js | v18+ | [Download](https://nodejs.org/) |
| npm | latest | Bundled with Node.js |
| MySQL | v8+ | [Download](https://www.mysql.com/downloads/) |
| TMDB API Key | — | [Get one free](https://developer.themoviedb.org/docs/getting-started) |

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ShreeKumbhar/filmverse.git
cd filmverse
```

**2. Install backend dependencies**

```bash
cd Backend
npm install
```

**3. Install frontend dependencies**

```bash
cd ../Frontend
npm install
```

---

### Environment Variables

**Backend** — Create `Backend/.env`:

```env
# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=filmverse

# Auth
JWT_SECRET=your_jwt_secret_key

# TMDB
TMDB_API_KEY=your_tmdb_api_key

# Server
PORT=5001
```

**Frontend** — Create `Frontend/.env`:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_BACKEND_URL=http://localhost:5001
```


---

### Database Setup

Open your MySQL client and run:

```sql
CREATE DATABASE filmverse;
```

The required tables (`users`, `favorites`) are created automatically when the backend server starts.

---

### Running the App

Open **two separate terminals** and run:

**Terminal 1 — Start the backend:**

```bash
cd Backend
node server.js
```

**Terminal 2 — Start the frontend:**

```bash
cd Frontend
npm start
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5001 |
| Health Check | http://localhost:5001/api/health |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate and receive JWT | No |
| `POST` | `/api/auth/reset-password` | Reset user password | No |

### User

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/profile/user` | Get logged-in user profile | ✅ Yes |

### Favorites

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/favorites` | Add a movie to favorites | ✅ Yes |

### System

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | API health check |

> Protected routes require a valid `Authorization: Bearer <token>` header.

---

## 🗄️ Database Verification

After signing up and adding favorites, you can verify data persistence with:

```sql
USE filmverse;

-- Check all tables
SHOW TABLES;

-- View registered users
SELECT id, name, email, created_at
FROM users
ORDER BY id DESC;

-- View saved favorites
SELECT id, user_id, movie_id, created_at
FROM favorites
ORDER BY id DESC;
```

If records appear, data persistence is working correctly. ✅

---

## 🧠 What This Project Demonstrates

| Skill | Details |
|---|---|
| ✅ Full-Stack Development | React frontend + Node.js/Express backend |
| ✅ REST API Design | Clean route structure with Express.js |
| ✅ Authentication & Authorization | JWT-based auth with protected routes |
| ✅ Password Security | Hashing with bcryptjs |
| ✅ Relational Database | Schema design and persistence with MySQL |
| ✅ Third-Party API Integration | Real-time movie data from TMDB |
| ✅ React Architecture | Component design, hooks, and React Router |
| ✅ Environment Configuration | Secure config management with `.env` files |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shree Kumbhar**

[![GitHub](https://img.shields.io/badge/GitHub-ShreeKumbhar-181717?style=for-the-badge&logo=github)](https://github.com/ShreeKumbhar)

---

<div align="center">

⭐ **If you found this project helpful, please consider giving it a star!** ⭐

Made with ❤️ by [Shree Kumbhar](https://github.com/ShreeKumbhar)

</div>
