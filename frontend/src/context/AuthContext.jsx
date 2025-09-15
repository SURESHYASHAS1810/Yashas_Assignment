import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
      setAuthToken(t);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
      setAuthToken(t);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
