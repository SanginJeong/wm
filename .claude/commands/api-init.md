Initialize the `apps/api` backend project for WONDERMALL from scratch.

Use the backend-developer agent to perform all steps.

## What to do

1. Create `apps/api/` directory structure exactly as defined in the backend-developer agent:
   ```
   apps/api/src/
   ├── server.ts
   ├── app.ts
   ├── routes/
   ├── controllers/
   ├── services/
   ├── models/
   ├── middleware/
   └── utils/
   ```

2. Create `apps/api/package.json` with:
   - name: `@wondermall/api`
   - dependencies: express, mongoose, bcryptjs, jsonwebtoken, cookie-parser, cors, dotenv, express-rate-limit
   - devDependencies: typescript, ts-node, nodemon, @types/express, @types/node, @types/bcryptjs, @types/jsonwebtoken, @types/cookie-parser, @types/cors
   - scripts: `dev` (nodemon), `build` (tsc), `start` (node dist/server.js), `typecheck` (tsc --noEmit)

3. Create `apps/api/tsconfig.json` — target ES2022, module commonjs, outDir dist, rootDir src, strict true

4. Create `apps/api/.env.example` with all required variables:
   - PORT, MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
   - KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI
   - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
   - CLIENT_ORIGIN

5. Create `apps/api/src/app.ts` — Express app with CORS (CLIENT_ORIGIN only), cookie-parser, json body parser, all route mounts

6. Create `apps/api/src/server.ts` — MongoDB connect then app.listen

7. Create `apps/api/src/utils/jwt.ts` — signAccessToken (15min), signRefreshToken (7d), verifyToken

8. Create `apps/api/src/utils/hash.ts` — hashPassword, comparePassword using bcrypt saltRounds 12

9. Create `apps/api/src/middleware/authenticate.ts` — Bearer token extraction → verify → attach req.user

10. Create `apps/api/src/middleware/authorize.ts` — role-based guard factory (e.g. authorize('admin'))

11. Create `apps/api/src/middleware/rateLimiter.ts` — loginRateLimiter: 5 attempts per 15 minutes

12. Add `apps/api` to pnpm workspace if `pnpm-workspace.yaml` exists

Write all files with production-quality TypeScript. No placeholders.
