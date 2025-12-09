// vessel-frontend/src/Register.js
import React, { useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Operator");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // simple email regex (good enough for most UI checks)
  const emailIsValid = (e) => {
    if (!e) return true; // allow empty if you want email optional; change to false to require email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setError("");

    // frontend validation
    if (!username || username.trim().length === 0) {
      setError("Username is required.");
      return;
    }
    if (!emailIsValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!["Operator", "Analyst", "Admin"].includes(role)) {
      setError("Please choose a valid role.");
      return;
    }

    setLoading(true);
    try {
      // call backend register
      await api.post("auth/register/", {
        username: username.trim(),
        email: email.trim(),
        password,
        role,
      });

      // on success show simple message and go to login
      alert("Registration successful! Please login with your new credentials.");
      nav("/"); // redirect to Login
    } catch (err) {
      console.error("Register error:", err);
      // Prefer backend-provided messages (DRF returns field errors)
      const resp = err?.response?.data;
      if (resp) {
        // if response is a dict of field errors (e.g. username: ["..."])
        if (typeof resp === "object") {
          if (resp.username) setError(Array.isArray(resp.username) ? resp.username.join(" ") : String(resp.username));
          else if (resp.password) setError(Array.isArray(resp.password) ? resp.password.join(" ") : String(resp.password));
          else if (resp.detail) setError(String(resp.detail));
          else setError(JSON.stringify(resp));
        } else {
          setError(String(resp));
        }
      } else {
        setError("Registration failed — check your network and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={submit}>
        <input
          className="auth-input"
          placeholder="Username (required)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="auth-input"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={{ display: "block", textAlign: "left", margin: "8px 0 6px 5%" }}>
          Role:
        </label>
        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Operator">Operator</option>
          <option value="Analyst">Analyst</option>
          <option value="Admin">Admin</option>
        </select>

        <br />
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="auth-error">{error}</p>}

      <div className="auth-link">
        Already registered? <Link to="/">Login</Link>
      </div>
    </div>
  );
}
