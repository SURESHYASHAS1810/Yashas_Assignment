import React, { useEffect, useState } from "react";
import api from "../../utils/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="bg-white p-4 shadow rounded">
        <p>Total Feedback: {stats.totalFeedback ?? "-"}</p>
        <p>Total Students: {stats.totalStudents ?? "-"}</p>
      </div>
    </div>
  );
}
