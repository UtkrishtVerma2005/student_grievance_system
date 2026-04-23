import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">🔐 Student Grievance System</h1>

      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

        {/* 🔗 Register Link */}
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#38bdf8", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}