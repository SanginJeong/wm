Generate the `packages/api` shared API client for WONDERMALL.

Use the backend-developer agent to implement this.

## What to create

`packages/api/` is a shared package used by `apps/web` to call the backend. The frontend must NEVER call fetch/axios directly — always through this package.

### Directory structure

```
packages/api/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts          — re-export everything
    ├── client.ts         — axios instance + interceptors
    ├── auth.ts           — auth API calls
    ├── cart.ts           — cart API calls
    ├── orders.ts         — orders API calls
    ├── payments.ts       — payments API calls
    ├── addresses.ts      — addresses API calls
    ├── wishlist.ts       — wishlist API calls
    ├── users.ts          — users API calls
    └── types.ts          — shared TypeScript types/interfaces
```

### `client.ts` requirements

- axios instance with `baseURL` from env (`VITE_API_URL`)
- `withCredentials: true` (for httpOnly RT cookie)
- Request interceptor: attach `Authorization: Bearer {accessToken}` from in-memory store
- Response interceptor:
  - On 401: call `POST /api/auth/refresh`, get new accessToken, store it, retry original request once
  - On second 401 (refresh failed): clear token, redirect to login

### `types.ts` — shared interfaces

Define TypeScript interfaces matching backend models:
- `User`, `CartItem`, `Cart`, `Address`, `OrderItem`, `Order`, `Payment`, `WishlistItem`
- `ApiResponse<T>` — `{ success: boolean; data?: T; error?: string }`

### Each domain file

Export typed async functions. Examples:
```ts
// auth.ts
export const signup = (body: SignupBody) => client.post<ApiResponse<AuthData>>('/api/auth/signup', body)
export const login = (body: LoginBody) => client.post<ApiResponse<AuthData>>('/api/auth/login', body)
export const logout = () => client.post('/api/auth/logout')
export const refresh = () => client.post<ApiResponse<{ accessToken: string }>>('/api/auth/refresh')
```

### `package.json`

- name: `@wondermall/api`
- No framework dependencies — only axios
- Add to pnpm workspace
- Update `apps/web/package.json` to add `@wondermall/api: workspace:*` dependency

Write strict TypeScript throughout.
