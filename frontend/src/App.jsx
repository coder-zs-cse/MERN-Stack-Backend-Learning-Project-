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
import Temp from "./pages/temp.jsx";
import ForgotPassword from "./components/forgotPassword.jsx";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/landing.jsx";
import Profile from "./pages/profile.jsx";
// import Temp from "./pages/temp.jsx";
import Tickets from "./pages/user/ticket/Tickets.jsx";
import FirebaseAuth from "./components/FirebaseAuth.jsx";

import ResetPassword from "./components/resetPassword.jsx";
import Users from "./pages/admin/users.jsx";
import Newsletter from "./pages/admin/newsletter.jsx";
import Assistant from "./components/Assistant.jsx";
import AdminAssistantPage from "./pages/admin/adminAssistant.jsx";
import DoctorProfile from "./pages/doctor/profile/DoctorProfile.jsx";
import DoctorList from "./pages/user/doctorList.jsx";
import NotAuthorized from "./pages/notAuthorized.jsx";
import DoctorAppointment from "./pages/user/doctorAppointment.jsx";
import Appointments from "./pages/user/Appointments.jsx";
import ProcessingPaymentPage from "./pages/payment/processingPayment.jsx";   
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Landing />} />
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
              <ProtectedRoute allowedRoles={['user','admin']}>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Layout>
                  <DoctorList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors/:id"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Layout>
                  <DoctorAppointment />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Layout>
                  <Appointments />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Layout>
                  <Tickets />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/processing-payment/"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Layout>
                  <ProcessingPaymentPage />
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
            path="/temp"
            element={
                <Temp />
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Layout>
                  <DoctorProfile />
                </Layout>
              </ProtectedRoute>
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
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/newsletter"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <Newsletter />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/assistant"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <FirebaseAuth>
                    <AdminAssistantPage />
                  </FirebaseAuth>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/not-authorised"
            element={
              <NotAuthorized />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
