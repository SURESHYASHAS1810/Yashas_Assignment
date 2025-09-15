import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import StudentDashboard from "./pages/Dashboard/StudentDashboard.jsx";

import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
import Feedback from "./pages/Feedback.jsx";
import Profile from "./pages/Profile.jsx";
import Courses from "./pages/Courses.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student-protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin-only */}
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<Courses />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
