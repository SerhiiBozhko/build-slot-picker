import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import React from "react";
import { createRoot } from 'react-dom/client';
import { peepTheme } from "./theme";

//@ts-ignore
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={peepTheme}>
      <CssBaseline />

      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
