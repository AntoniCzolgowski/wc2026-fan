import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/global.css";
import "./styles/components.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found. Check index.html for <div id='root'>");
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
