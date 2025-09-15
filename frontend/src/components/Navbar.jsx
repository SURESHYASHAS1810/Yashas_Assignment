import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">FeedbackApp</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/feedback" className="text-sm">Feedback</Link>
              <Link to="/profile" className="text-sm">Profile</Link>
              {user.role === "admin" && <Link to="/admin" className="text-sm">Admin</Link>}
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="text-sm">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
