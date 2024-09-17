import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./components/styles/global.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
