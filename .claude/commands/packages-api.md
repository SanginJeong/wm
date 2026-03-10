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
  - On 401: refresh 재귀 방지를 위해 **별도의 bare axios 인스턴스**(`refreshClient`)로 `POST /api/auth/refresh` 호출 — 인터셉터 없는 인스턴스이므로 재진입 불가
  - refresh 성공 시: 새 accessToken 저장 후 원본 요청을 새 토큰으로 1회 재시도
  - refresh 실패(401) 또는 재시도 후 재실패 시: 토큰 초기화 후 로그인 페이지로 redirect
  - `_retry` 플래그를 config에 추가해 동일 요청의 2회 재시도 방지
  ```ts
  // 구현 패턴
  const refreshClient = axios.create({ baseURL, withCredentials: true }); // 인터셉터 없음

  client.interceptors.response.use(null, async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const { data } = await refreshClient.post('/api/auth/refresh');
      setAccessToken(data.data.accessToken);
      error.config.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
      return client(error.config);
    }
    clearAccessToken();
    window.location.href = '/login';
    return Promise.reject(error);
  });
  ```

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
