# Login API

This project is an Express and MongoDB API for user registration, email verification, and login.

## Requirements

- Node.js and npm
- A MongoDB instance
- A Gmail account with an app password for sending verification emails

## Setup

1. Open a terminal in `backend` and install the dependencies:

   ```sh
   npm install
   ```

2. Create `backend/.env`:

   ```dotenv
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/login
   JWT_SECRET=replace-with-a-long-random-secret
   EMAIL_USER=your-gmail-address@gmail.com
   PASS_USER=your-16-character-google-app-password
   ```

   `PORT` defaults to `5000`. Set a private, random `JWT_SECRET`; the current code falls back to the literal `secretkey` if it is omitted. `PASS_USER` must be a Google app password, not your regular Google password. Keep `.env` private.

3. Start the API from `backend`:

   ```sh
   npm run dev
   ```

   Use `npm start` for a regular start. The API base path is `http://localhost:5000/api/auth` when using the default port.

## API

All endpoints accept JSON request bodies. The routes are public.

### `POST /api/auth/register`

Request:

```json
{
  "username": "alex",
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

The controller requires all three values and rejects an existing email. It removes any previous OTP for that email, generates a six-digit code, sends a verification email, stores the OTP, hashes the password with bcrypt, and creates an unverified user.

- `201`: registration succeeded; verify the email before logging in.
- `400`: a value is missing or the email is already registered.
- `500`: registration failed, including an email or database error.

### `POST /api/auth/verify-otp`

Request:

```json
{
  "email": "alex@example.com",
  "otp": "123456"
}
```

The controller looks up the OTP by email and compares the submitted code. On a match, it marks the corresponding user as verified and deletes the OTP.

- `200`: email verified.
- `400`: email or OTP is missing, no OTP is found, or the code does not match.
- `404`: no user exists for the email.
- `500`: verification failed.

### `POST /api/auth/login`

Request:

```json
{
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

The controller checks the submitted password against the stored bcrypt hash. An unverified account receives a `403` response and the controller attempts to send a new verification code. A verified account receives a one-day JWT in both the JSON response and a `token` cookie.

Successful response:

```json
{
  "message": "Login successfully",
  "token": "<jwt>",
  "user": {
    "id": "<user-id>",
    "username": "alex",
    "email": "alex@example.com"
  }
}
```

- `400`: a value is missing or the email/password combination is invalid.
- `403`: the account is not verified.
- `200`: login succeeded.
- `500`: login failed.

## Email verification details

- Email is sent through Gmail using `EMAIL_USER` and `PASS_USER`.
- The mail subject is `TXO | Your OTP Code for verification`; the HTML template displays the code and says it expires in five minutes.
- The OTP model sets `expiresAt` to ten minutes after creation. **The current verification controller does not check `expiresAt`**, so expiration is not enforced by the API.
- The current login controller's unverified-account branch contains an unfinished `re` expression after sending and saving the OTP. The `403` is sent before that work; resend behavior should not be relied on until the branch is corrected.

## Project layout

```text
backend/
  server.js
  src/
    app.js
    controller/auth.controller.js
    db/db.js
    models/otp.model.js
    models/user.model.js
    rotues/auth.rotues.js
    template/email.js
    utilies/email.utiles.js
```
