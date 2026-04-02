# FilmVerse Deployment Guide

## Production Deployment Issues & Fixes

### Issue: 401 Unauthorized Error on Profile Page
If you see `Error fetching profile data: {message: 'Invalid token'}` in production, it's usually one of these issues:

#### 1. **JWT_SECRET Mismatch (Most Common)**
- The backend's `JWT_SECRET` environment variable must be the same in production as when you test locally
- Tokens are created with a secret during login/signup and verified with the same secret
- **If the secrets don't match, all tokens become invalid**

#### 2. **Token Expiration**
- Tokens now expire after **7 days** (previously 1 hour)
- Users will need to log in again after 7 days
- To extend further, update `expiresIn` in Backend/controllers/authController.js

---

## Setting Up on Render (or Any Cloud Host)

### Backend Environment Variables (Must set on Render/Cloud)

```env
MYSQL_HOST=your_database_host
MYSQL_PORT=3306
MYSQL_USER=your_database_user
MYSQL_PASSWORD=your_database_password
MYSQL_DATABASE=filmverse
JWT_SECRET=your_strong_secret_key_here
TMDB_API_KEY=your_tmdb_api_key
PORT=5001
```

**IMPORTANT**: For `JWT_SECRET`, use a strong random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste it into Render's environment variables.

### Frontend Environment Variables 

In `Frontend/.env`, replace localhost with your backend URL:

```env
REACT_APP_BACKEND_URL=https://film-verse.onrender.com
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

After changing environment variables:
1. Rebuild the frontend: `npm run build` in Frontend/
2. Push to GitHub: `git add . && git commit -m "..." && git push`
3. Trigger Render redeploy

---

## Database Setup

Make sure your cloud MySQL instance has these tables:

### Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Favorites Table
```sql
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_movie (user_id, movie_id),
  CONSTRAINT fk_user_favorites
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | JWT_SECRET mismatch | Ensure same JWT_SECRET on all environments |
| Connection refused | Backend URL wrong | Check REACT_APP_BACKEND_URL in Frontend/.env |
| Invalid token | Token expired | Token expires after 7 days; user must login again |
| Database connection error | Wrong credentials | Verify MYSQL_* variables on cloud provider |

