import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import "../App.css";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", category: "" });

  const token = localStorage.getItem("token");

  // 🔍 fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/grievances`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.log("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Login first bro");
      return;
    }
    fetchData();
  }, []);

  // 🔥 CREATE
  const create = async () => {
    console.log("Add clicked", form);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/grievances`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Created:", res.data);
      alert("Added successfully");

      fetchData();

    } catch (err) {
      console.log("Create error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error aa raha hai");
    }
  };

  // ❌ DELETE
  const del = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/grievances/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Deleted");
      fetchData();

    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Dashboard</h1>

      <div className="card">
        <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})}/>
        <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})}/>
        <input placeholder="Category" onChange={e => setForm({...form, category: e.target.value})}/>
        <button onClick={create}>Add</button>
      </div>

      {data.map(g => (
        <div key={g._id} className="card">
          <h3>{g.title}</h3>
          <p>{g.description}</p>
          <button onClick={() => del(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}