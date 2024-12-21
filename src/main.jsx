import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/keyframes.scss";
import "./colors.scss";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import LandingLayout from "./layout/landing";
import { ThemeProvider } from "./context/ThemeContext";
import NewWish from "./layout/new";
import Wall from "./layout/wall";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "",
        element: <Wall />,
      },
      {
        path: "new",
        element: <NewWish />,
      },
    ],
  },

  { path: "*", element: <div>404</div> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </UserProvider>
);
