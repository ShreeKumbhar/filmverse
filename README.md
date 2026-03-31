# FilmVerse

FilmVerse is a full-stack movie discovery web application where users can explore films, view detailed movie information, create accounts, and manage personal favorites.

The project is built with a React frontend and a Node.js/Express backend, with MySQL as the persistence layer and TMDB as the movie data source.

## Why This Project Stands Out

- End-to-end full-stack implementation (frontend, backend, database, authentication)
- JWT-based protected routes and user-specific favorites
- External API integration with TMDB for rich movie metadata
- Responsive UI with improved profile and authentication experiences

## Tech Stack

- Frontend: React, React Router, Axios, React Toastify
- Backend: Node.js, Express.js
- Database: MySQL (mysql2)
- Authentication: JWT + bcryptjs
- External API: TMDB API

## Project Structure

```text
FilmVerse/
	Backend/    # Express API + MySQL integration
	Frontend/   # React web application
	README.md
```

## Features

- Browse movies by category
- Open detailed movie pages with synopsis and metadata
- Sign up and log in with secure password hashing
- Add movies to favorites
- View and manage favorites from profile
- Protected profile route for authenticated users

## Prerequisites

- Node.js 18+
- npm
- MySQL 8+
- TMDB API key

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/FilmVerse.git
cd FilmVerse
```

### 2. Create Database

```sql
CREATE DATABASE filmverse;
```

### 3. Configure Environment Variables

Create Backend/.env:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=filmverse
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
PORT=5001
```

Create Frontend/.env:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_BACKEND_URL=http://localhost:5001
```

Note: Backend/.env.example is included as a reference template.

### 4. Install Dependencies

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Run the Application

Use two terminals.

Start backend:

```bash
cd Backend
node server.js
```

Start frontend:

```bash
cd Frontend
npm start
```

## Default Local URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Health Check: http://localhost:5001/api/health

## Key API Endpoints

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/favorites
- POST /api/auth/reset-password
- GET /api/profile/user
- GET /api/health

## Verify Data is Stored in MySQL

After signing up and adding favorites in the app, run:

```sql
USE filmverse;
SHOW TABLES;
SELECT id, name, email, created_at FROM users ORDER BY id DESC;
SELECT id, user_id, movie_id, created_at FROM favorites ORDER BY id DESC;
```

If rows appear in users and favorites, persistence is working correctly.

## Troubleshooting

- Port already in use:
	Change PORT in Backend/.env and update REACT_APP_BACKEND_URL in Frontend/.env.
- TMDB requests fail:
	Verify TMDB_API_KEY and REACT_APP_TMDB_API_KEY are valid.
- Cannot access profile/favorites:
	Ensure user is logged in and token exists in local storage.

## Demo

Demo video: https://drive.google.com/file/d/1bydNfWhQvzscf07RgFR6wQSjOf6FJIKP/view?usp=drive_link

## License

This project is licensed under the MIT License.

## Author

Shree Kumbhar
- GitHub: https://github.com/ShreeKumbhar

