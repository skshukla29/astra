# Astra Healthcare Platform

Astra is a multi-role healthcare web application that connects patients, doctors, hospitals, pharmacies, and administrators on a secure workflow platform.

## Key Capabilities

1. Landing page UI
- React landing page with tagline `Empowering Healthcare with AI`
- Navigation for Doctors, Patients, Hospitals, Pharmacies

2. Doctor registration + secure backend API
- React doctor registration form
- Node.js + Express API
- MongoDB persistence
- Password hashing with `bcryptjs`
- Input validation with `express-validator`
- RBAC: only doctors can create/update doctor profile

3. Patient search (safe)
- React page uses mock JSON data
- Search by specialization and location
- Query sanitization before filtering

4. Pharmacy locator + secure registration
- React page with Google Maps integration hooks
- Pin code filtering and markers
- Pharmacy registration form
- Backend validation and encrypted location storage (AES-256-GCM)

5. Hospital connectivity
- React dashboard with transfer flow and status message
- Backend JWT-protected endpoint to simulate secure transfer

6. Clinical decision support
- React file upload form
- Flask endpoint analyzes uploads and returns a diagnostic support result
- Temporary file storage with auto-delete
- Basic malware signature check and image integrity verification

7. Authentication
- Firebase client auth wiring for email/password
- Backend stores hashed password and role
- JWT access token expiry: 1 hour
- Refresh token in secure HttpOnly cookie
- Doctor login requires 2FA code (prototype server-side check)

8. Product polish
- Responsive navbar and footer in React
- HTTPS enforced in production in backend middleware
- CSRF protection enabled on API routes

## Project Structure

- `server.js`: Express API and security middleware
- `src/`: backend routes, controllers, models, middleware
- `client/`: React app (Vite)
- `ai-service/`: Flask AI demo service

## Run Backend

```bash
npm install
# On Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

Backend URL: `http://localhost:5000`

## Run Frontend

```bash
cd client
npm install
# On Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

Frontend URL: `http://localhost:5173`

## Run AI Service

```bash
cd ai-service
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
```

AI URL: `http://localhost:8000`

## Security Notes

- HTTPS redirect is enabled in production mode.
- JWT tokens are set in HttpOnly cookies.
- CSRF token endpoint: `GET /api/security/csrf-token`
- Use `CSRF-Token` header for state-changing requests.
- For production, replace prototype 2FA with Firebase MFA + TOTP/SMS.
