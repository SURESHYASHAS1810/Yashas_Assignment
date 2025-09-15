import React, { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  const addCourse = async (e) => {
    e.preventDefault();
    await api.post("/courses", { title });
    setTitle("");
    loadCourses();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Courses</h2>
      <form onSubmit={addCourse} className="flex gap-2">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New course" className="border p-2 rounded flex-1"/>
        <button className="bg-indigo-600 text-white px-3 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {courses.map(c => (
          <li key={c._id} className="bg-white p-2 rounded shadow">{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
