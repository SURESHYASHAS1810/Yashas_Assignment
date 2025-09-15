import React, { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", address: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api.get("/users/me");
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        dob: res.data.dob ? res.data.dob.split("T")[0] : "",
        address: res.data.address || ""
      });
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.put("/users/me", form);
    setMsg("Profile updated");
    setForm(res.data);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">My Profile</h2>
      {msg && <p className="text-green-600">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full p-2 border rounded"/>
        <input type="email" value={form.email} readOnly className="w-full p-2 border rounded bg-gray-100"/>
        <input type="text" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="w-full p-2 border rounded"/>
        <input type="date" value={form.dob} onChange={e=>setForm({...form, dob: e.target.value})} className="w-full p-2 border rounded"/>
        <textarea value={form.address} onChange={e=>setForm({...form, address: e.target.value})} className="w-full p-2 border rounded"/>
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
}
