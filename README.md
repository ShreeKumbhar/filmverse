# 🎬 FilmVerse – Full Stack Movie Discovery Platform

FilmVerse is a **full-stack movie discovery web application** that allows users to explore movies, view detailed information, create accounts, and maintain a personalized list of favorite films.

The platform integrates with the **TMDB API** to provide rich movie data and implements **secure authentication, protected routes, and persistent user data** using a MySQL database.

This project demonstrates **end-to-end full-stack development**, including frontend UI design, backend API development, authentication systems, and database integration.

---

# 🚀 Live Features

FilmVerse allows users to:

- 🔍 Browse movies by category
- 🎬 View detailed movie information (poster, overview, rating, release date)
- 🔐 Sign up and log in securely
- ❤️ Add movies to a personal favorites list
- 👤 Access a protected user profile page
- 📂 Store user data and favorites in a MySQL database

---

# 🏗️ System Architecture

The application follows a **client-server architecture**:

```
React Frontend  →  Express API Server  →  MySQL Database
        ↓
     TMDB API
```

- **Frontend** handles UI rendering and user interactions.
- **Backend** manages authentication, API routes, and database operations.
- **MySQL** stores user accounts and favorites.
- **TMDB API** supplies movie data.

---

# 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- React Toastify
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs for password hashing

### Database
- MySQL (mysql2)

### External API
- TMDB (The Movie Database API)

### Tools
- Git & GitHub
- Postman
- npm

---

# 📂 Project Structure

```
FilmVerse/
│
├── Backend/                # Express server and API logic
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db/
│   ├── server.js
│   └── .env.example
│
├── Frontend/               # React application
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── .env
│
└── README.md
```

---

# 🔑 Key Features Implementation

### 🔐 Authentication System
- Secure **JWT-based authentication**
- Password hashing using **bcryptjs**
- Protected routes for user profile access

### ❤️ Favorite Movies System
- Users can add movies to favorites
- Favorites stored in **MySQL database**
- Each user has their **own personalized list**

### 🌐 External API Integration
- Movie data fetched from **TMDB API**
- Posters, ratings, release dates, and summaries dynamically loaded

### 📱 Responsive UI
- Clean and responsive design
- Smooth navigation with **React Router**

---

# ⚙️ Prerequisites

Before running the project, install:

- **Node.js 18+**
- **npm**
- **MySQL 8+**
- **TMDB API key**

---

# 🧑‍💻 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/FilmVerse.git
cd FilmVerse
```

---

# 🗄️ Database Setup

Create a database in MySQL:

```sql
CREATE DATABASE filmverse;
```

---

# 🔑 Environment Variables

### Backend Configuration

Create `Backend/.env`

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=filmverse

JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key

PORT=5001
```

---

### Frontend Configuration

Create `Frontend/.env`

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_BACKEND_URL=http://localhost:5001
```

---

# 📦 Install Dependencies

### Install Backend Dependencies

```bash
cd Backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

---

# ▶️ Run the Application

Run the **backend and frontend in separate terminals**.

### Start Backend

```bash
cd Backend
node server.js
```

### Start Frontend

```bash
cd Frontend
npm start
```

---

# 🌐 Default Local URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5001
```

Health Check

```
http://localhost:5001/api/health
```

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/favorites` | Add movie to favorites |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/profile/user` | Get logged-in user profile |
| GET | `/api/health` | API health check |

---

# 🧪 Verify Database Persistence

After creating an account and adding favorites, run:

```sql
USE filmverse;

SHOW TABLES;

SELECT id, name, email, created_at
FROM users
ORDER BY id DESC;

SELECT id, user_id, movie_id, created_at
FROM favorites
ORDER BY id DESC;
```

If records appear in the tables, persistence is working correctly.

---

# 🎥 Demo

Demo Video:  
https://drive.google.com/file/d/1bydNfWhQvzscf07RgFR6wQSjOf6FJIKP/view

---

# 🧠 What This Project Demonstrates

- Full-stack development skills
- REST API development
- Authentication and authorization
- Database design and persistence
- Third-party API integration
- React component architecture

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Shree Kumbhar**

GitHub  
https://github.com/ShreeKumbhar
