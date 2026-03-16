import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { theme, GlobalStyles } from "@wondermall/ui";
import { configureBackendInstance } from "@wondermall/api";
import { useAuthStore } from "./features/auth/stores/useAuthStore";

configureBackendInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api",
  getToken: () => useAuthStore.getState().accessToken,
  onRefreshed: (token) =>
    useAuthStore.getState().setAuth(token, useAuthStore.getState().user!),
  onUnauthorized: () => useAuthStore.getState().clearAuth(),
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
