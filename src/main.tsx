import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/base.scss";
import AppRoutes from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
