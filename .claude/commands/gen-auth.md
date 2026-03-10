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
- **Refresh Token**: JWT with `jti` (UUID) claim, 7 days expiry
  - `refreshTokens` 컬렉션에 `{ jti, tokenHash (bcrypt), userId, expiresAt }` 저장
  - Send raw token as httpOnly cookie named `rt` with the following policy:
    | 배포 토폴로지 | sameSite | Secure | 비고 |
    |---|---|---|---|
    | 동일 도메인 (e.g. web.foo.com / api.foo.com) | `lax` | true | 서브도메인은 same-site로 간주 |
    | 다른 도메인 (e.g. vercel.app / railway.app) | `none` | true | HTTPS 필수, Secure 없으면 브라우저가 쿠키 거부 |
    | 로컬 개발 (localhost) | `lax` | false | HTTP 허용 |
  - 환경변수 `NODE_ENV`와 `COOKIE_SAME_SITE`로 런타임에 정책 주입, 하드코딩 금지
- **Login rate limiting**: apply `loginRateLimiter` middleware (5 attempts per 15 minutes per IP)
- **OAuth users**: provider = 'kakao' or 'google', no passwordHash, upsert by providerId
- **Refresh endpoint**: read `rt` cookie → JWT decode → extract `jti` → DB에서 `jti`로 레코드 조회 → `bcrypt.compare(rawToken, tokenHash)` 검증 → 유효하면 기존 레코드 삭제 후 새 RT 발급 (rotation), 새 AT 반환

### Response format

- Login/signup success: `{ success: true, data: { accessToken, user: { id, email, role } } }`
- Errors: `{ success: false, error: string }` with appropriate HTTP status

Write production-quality TypeScript with no `any` types.
