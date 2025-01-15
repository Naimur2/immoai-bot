import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Use createRoot
