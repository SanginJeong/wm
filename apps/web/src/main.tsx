import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { theme, GlobalStyles } from "@wondermall/ui";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
