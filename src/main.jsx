import React from "react";
import ReactDOM from "react-dom/client";
import "non.geist";

import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import LandingLayout from "./layout/landing";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./layout/dashboard";
import AuthLayout from "./layout/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      // Add your children routes here
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      // Add your children routes here
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // Add your children routes here
    ],
  },
  { path: "*", element: <div>404</div> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
