import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      <p>Welcome! You can manage your feedback and profile.</p>
      <div className="space-x-4">
        <Link to="/feedback" className="px-4 py-2 bg-indigo-600 text-white rounded">My Feedback</Link>
        <Link to="/profile" className="px-4 py-2 bg-green-600 text-white rounded">Profile</Link>
      </div>
    </div>
  );
}
