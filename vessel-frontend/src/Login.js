// vessel-frontend/src/Login.js
import React, { useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    console.log("[UI] Attempting login:", { username, password });
    try {
      const res = await api.post("auth/token/", { username, password });
      console.log("[UI] token res", res.data);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      const profile = await api.get("auth/profile/");
      console.log("[UI] profile", profile.data);
      const role = profile.data.role || "Operator";
      if (role === "Operator") nav("/operator");
      else if (role === "Analyst") nav("/analyst");
      else nav("/admin");
    } catch (e) {
      console.error("[UI] login error:", e.response?.data || e.message);
      setErr("Login failed — check console");
    }
  };

  return (
    <div className="auth-container">
      <h2>Maritime Dashboard Login </h2>

      <form onSubmit={submit}>
        <input
          className="auth-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setU(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setP(e.target.value)}
          required
        />
        <br />
        <br />
        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>

      {err && <p className="auth-error">{err}</p>}

      <div style={{ marginTop: 12 }}>
        <span style={{ marginRight: 8 }}>Don't have an account?</span>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="auth-btn" style={{ width: "auto", padding: "8px 14px", background: "#28a745" }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
