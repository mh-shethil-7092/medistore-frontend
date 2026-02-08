"use client";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalMeds: 0, totalOrders: 0 });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // 1. Fetch Stats
    fetch("https://medistore-backend-production.up.railway.app/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));

    // 2. Fetch Users
    fetch("https://medistore-backend-production.up.railway.app/api/auth/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const changeRole = async (userId: string, newRole: string) => {
    const res = await fetch("https://medistore-backend-production.up.railway.app/api/auth/update-role", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    });

    if (res.ok) {
      alert("Role updated!");
      window.location.reload(); // Refresh to see changes
    }
  };

  return (
    <div className="p-8 text-white bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Control Center</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-600/20 border border-blue-500/50 p-6 rounded-lg text-center">
          <h2 className="text-xl text-blue-400">Total Medicines</h2>
          <p className="text-4xl font-bold">{stats.totalMeds}</p>
        </div>
        <div className="bg-purple-600/20 border border-purple-500/50 p-6 rounded-lg text-center">
          <h2 className="text-xl text-purple-400">Total Orders</h2>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="mt-12 bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-semibold">User Management</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-zinc-800/50">
                <td className="p-4">{user.name}</td>
                <td className="p-4 text-zinc-400">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                    user.role === 'admin' ? 'bg-red-500/20 text-red-400' : 
                    user.role === 'seller' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700 text-zinc-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button 
                    onClick={() => changeRole(user._id, "admin")}
                    className="text-xs bg-zinc-700 hover:bg-red-600 px-2 py-1 rounded transition"
                  >
                    Make Admin
                  </button>
                  <button 
                    onClick={() => changeRole(user._id, "seller")}
                    className="text-xs bg-zinc-700 hover:bg-green-600 px-2 py-1 rounded transition"
                  >
                    Make Seller
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}