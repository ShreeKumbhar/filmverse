# Post-Deployment Verification Checklist

## Step 1: Verify Backend is Running
Test your backend health endpoint:
```bash
curl https://film-verse.onrender.com/api/health
```
Expected response: `{"message":"FilmVerse backend is running"}`

## Step 2: Test Authentication Flow

### Signup Test
```bash
curl -X POST https://film-verse.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```
Expected: Status 201 with token in response

### Login Test
```bash
curl -X POST https://film-verse.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
Expected: Status 200 with token in response

## Step 3: Test Protected Route (Profile)
```bash
# Replace YOUR_TOKEN with the token from login above
curl -X GET https://film-verse.onrender.com/api/profile/user \
  -H "Authorization: Bearer YOUR_TOKEN"
```
Expected: Status 200 with user profile data

## Step 4: Frontend Testing
1. **Open your app**: https://film-verse.onrender.com (or your frontend domain)
2. **Sign up** with a test account
3. **Login** with the same credentials
4. **Access Profile** page — should NOT show "Invalid token" error
5. **Add/Remove favorites** — should work without 401 errors
6. **Stay logged in for 7 days** — new token expiry is active

## Step 5: Check Environment Variables on Render

Backend service → Settings → Environment:
- ✅ `JWT_SECRET` = Your strong random string
- ✅ `MYSQL_HOST` = Your database host
- ✅ `MYSQL_USER` = Your database user
- ✅ `MYSQL_PASSWORD` = Your database password
- ✅ `MYSQL_DATABASE` = filmverse
- ✅ `TMDB_API_KEY` = Your TMDB key
- ✅ `PORT` = 5001

Frontend service → Environment:
- ✅ `REACT_APP_BACKEND_URL` = https://film-verse.onrender.com
- ✅ `REACT_APP_TMDB_API_KEY` = Your TMDB key

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Still getting 401 errors | Verify JWT_SECRET is set AND matches on all instances; redeploy backend |
| "Invalid token" on profile | Token expired (relogin) OR JWT_SECRET mismatch |
| Cannot connect to database | Check MYSQL_* credentials match your provider |
| Blank profile/no favorites | Profile loads but favorites fail; check TMDB API key |
| Login works, profile fails | JWT verification issue; check JWT_SECRET is exactly what you set |

## If Issues Persist

1. **Check Backend Logs**: Render dashboard → Logs tab
2. **Check Frontend Console**: Browser DevTools (F12) → Console tab
3. **Redeploy Backend**: Click "Manual Deploy" in Render to refresh with latest code
4. **Clear Browser Cache**: Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
