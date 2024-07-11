import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import { Home } from "./pages/home.jsx";
import "./App.css";
import { Login } from "./pages/login.jsx";
import { Register } from "./pages/register.jsx";
import { ProtectedRoute } from "./components/protectedRoute.jsx";
import { PublicRoutes } from "./components/publicRoute.jsx";
import ForgotPassword from "./components/forgotPassword.jsx";
import Landing from "./pages/landing.jsx";
import Profile from "./pages/profile.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/'
          element={
            <Landing />
          }
        />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
