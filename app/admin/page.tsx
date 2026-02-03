"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalMeds: 0, totalOrders: 0 });

  useEffect(() => {
    // Fetch stats from backend
    fetch("http://localhost:5000/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Control Center</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <h2 className="text-xl">Total Medicines</h2>
          <p className="text-4xl font-bold">{stats.totalMeds}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg text-center">
          <h2 className="text-xl">Total Orders</h2>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>
      </div>
      {/* Add a table below to list users and delete them if needed */}
    </div>
  );
}