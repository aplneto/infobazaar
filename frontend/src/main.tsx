import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import DebugPage from "./pages/DebugPage";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StorePage from "./pages/StorePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import RegistrationAlertPage from "./pages/RegistrationAlertPage";
import VerificationPage from "./pages/VerificationPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/store", element: <StorePage /> },
  { path: "/disclaimer", element: <DisclaimerPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/logout", element: <LogoutPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/profile/:username", element: <ProfilePage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/registration-success", element: <RegistrationAlertPage /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/debug", element: <DebugPage /> },
  { path: "/verify", element: <VerificationPage /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
