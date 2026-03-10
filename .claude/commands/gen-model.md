Generate a Mongoose model for WONDERMALL `apps/api`.

Use the backend-developer agent to implement this.

## Input

The user will specify a collection name after the command, e.g.:
`/gen-model order`

If no name is provided, ask the user which collection they want.

## Available collections and their schemas (from backend-developer agent)

- **user**: email, passwordHash, provider ('local'|'kakao'|'google'), providerId, role ('user'|'admin'), points
  - `email`: sparse unique index — local 가입자는 필수, OAuth 전용 계정은 email 없을 수 있음
  - `{ provider, providerId }`: compound unique index — OAuth 업서트 시 중복 계정 방지
  - 동시 가입/업서트 race condition을 DB 레벨에서 차단
- **refreshToken**: userId (ref User), jti (unique), tokenHash (bcrypt), expiresAt — TTL index on expiresAt, unique index on jti
- **cart**: userId (unique, ref User), items[] { productId, productName, productImage, price, quantity }
- **address**: userId (ref User), label, recipient, phone, zipCode, address1, address2, isDefault (boolean)
- **order**: orderNumber (unique), userId (ref User), items[] { productId, productName, productImage, price, quantity }, shippingAddress { recipient, phone, zipCode, address1, address2 }, status ('pending'|'paid'|'shipped'|'delivered'|'cancelled'), amounts { subtotal, shipping, total }, finalAmount, trackingNumber
- **payment**: orderId (ref Order), userId (ref User), paymentKey (unique), method, amount, status ('ready'|'done'|'cancelled'|'failed'), tossResponse (Mixed)
- **wishlist**: userId (ref User), productId, productName, productImage, price — unique compound index on userId+productId

## What to generate

Create `apps/api/src/models/{name}.model.ts` with:
- Full Mongoose Schema with correct field types and validations
- Proper indexes (TTL, unique, compound as needed per schema above)
- TypeScript interface `I{Name}` and `I{Name}Document` extending Document
- Export the model as default

Do not use `any` types. Use strict TypeScript throughout.
