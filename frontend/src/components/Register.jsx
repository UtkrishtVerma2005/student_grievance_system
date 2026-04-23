import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}/api/register`, data);
      alert("Registered Successfully");
      navigate("/login"); // 🔥 auto redirect after register
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">🎓 Student Grievance System</h1>

      <div className="card">
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Register</button>

        {/* 🔗 Login Link */}
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#38bdf8", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}