Generate a complete Route + Controller + Service trio for a WONDERMALL API domain.

Use the backend-developer agent to implement this.

## Input

The user will specify a domain after the command, e.g.:
`/gen-route cart`

If no domain is provided, ask the user which domain to generate.

## Available domains and their endpoints

- **cart**: GET / (get cart), POST /items (add item), PATCH /items/:productId (update qty), DELETE /items/:productId (remove item), DELETE / (clear cart)
- **addresses**: GET / (list), POST / (create), PATCH /:id (update), DELETE /:id (delete), PATCH /:id/default (set default)
- **orders**: POST / (create order from cart), GET / (list my orders), GET /:id (get one), PATCH /:id/cancel (cancel)
- **payments**: POST /confirm (Toss confirm — MUST verify order.finalAmount === toss amount), GET /:paymentKey (get payment)
- **wishlist**: GET / (list), POST / (add), DELETE /:productId (remove)
- **users**: GET /me (get profile), PATCH /me (update profile)
- **admin**: GET /orders (all orders), PATCH /orders/:id/status (update status), GET /users (all users), PATCH /users/:id/role (update role)

## What to generate

1. `apps/api/src/routes/{domain}.routes.ts`
   - Express Router
   - Apply `authenticate` middleware to all routes
   - Apply `authorize('admin')` for admin routes
   - Wire controller methods

2. `apps/api/src/controllers/{domain}.controller.ts`
   - One function per endpoint
   - Extract params/body/user from req
   - Call service, return JSON response
   - Wrap in try/catch, pass errors to next()
   - No business logic here

3. `apps/api/src/services/{domain}.service.ts`
   - All business logic here
   - Mongoose queries
   - For payments/confirm: compare `order.finalAmount` with toss amount, throw if mismatch

4. Register the new route in `apps/api/src/app.ts` if not already registered.

Use strict TypeScript, no `any`. Return consistent `{ success, data }` or `{ success, error }` shapes.
