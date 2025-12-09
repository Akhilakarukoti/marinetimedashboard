// paste as vessel-frontend/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import api from "./api";
import "./App.css";

function Dashboard({ title }) {
  const nav = useNavigate();

  const logout = () => {
    // clear tokens & go to login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // optional: inform backend (if you implemented token blacklist)
    nav("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{title}</h1>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <p>Welcome to the {title} page.</p>
      <p>Protected content goes here.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/operator" element={<Dashboard title="Operator Dashboard" />} />
        <Route path="/analyst" element={<Dashboard title="Analyst Dashboard" />} />
        <Route path="/admin" element={<Dashboard title="Admin Dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
