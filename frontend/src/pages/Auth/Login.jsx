import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await login(email, password);
    if (res.success) nav("/");
    else setErr(res.message || "Login failed");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <p className="text-red-600">{err}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full p-2 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full p-2 border rounded"/>
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="mt-2 text-sm">No account? <Link to="/signup" className="text-indigo-600">Signup</Link></p>
    </div>
  );
}
