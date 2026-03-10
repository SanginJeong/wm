Generate the complete authentication system for WONDERMALL `apps/api`.

Use the backend-developer agent to implement this.

## What to implement

### Files to create/update

1. **`apps/api/src/models/user.model.ts`** (if not exists)
2. **`apps/api/src/models/refreshToken.model.ts`** (if not exists) — TTL index on expiresAt
3. **`apps/api/src/services/auth.service.ts`** — all auth business logic
4. **`apps/api/src/controllers/auth.controller.ts`** — thin controller, delegate to service
5. **`apps/api/src/routes/auth.routes.ts`** — route definitions with loginRateLimiter

### Endpoints to implement

```
POST /api/auth/signup           — email/password registration
POST /api/auth/login            — email/password login (rate limited: 5/15min)
POST /api/auth/logout           — invalidate RT from DB + clear cookie
POST /api/auth/refresh          — read RT from httpOnly cookie → verify hash → issue new AT
GET  /api/auth/kakao            — redirect to Kakao OAuth
GET  /api/auth/kakao/callback   — exchange code → upsert user → issue tokens
GET  /api/auth/google           — redirect to Google OAuth
GET  /api/auth/google/callback  — exchange code → upsert user → issue tokens
```

### Security rules (non-negotiable)

- **Passwords**: bcrypt with saltRounds 12 (use `apps/api/src/utils/hash.ts`)
- **Access Token**: JWT, 15 minutes expiry, in response body
- **Refresh Token**: JWT, 7 days expiry
  - Store as bcrypt hash in `refreshTokens` collection
  - Send raw token as httpOnly, secure, sameSite=strict cookie named `rt`
- **Login rate limiting**: apply `loginRateLimiter` middleware (5 attempts per 15 minutes per IP)
- **OAuth users**: provider = 'kakao' or 'google', no passwordHash, upsert by providerId
- **Refresh endpoint**: read `rt` cookie → find matching hash in DB → if valid, delete old record, issue new RT (rotation), return new AT

### Response format

- Login/signup success: `{ success: true, data: { accessToken, user: { id, email, role } } }`
- Errors: `{ success: false, error: string }` with appropriate HTTP status

Write production-quality TypeScript with no `any` types.
