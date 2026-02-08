"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Role = "customer" | "seller";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" as Role,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://medistore-backend-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      // Auto-Login Logic
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
      Cookies.set("token", data.token, { expires: 7 });

      window.dispatchEvent(new Event("auth-change"));

      alert("Account created successfully!");
      router.push(`/`);
      router.refresh();
      
    } catch (error) {
      alert("Registration error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl space-y-5">
        <h2 className="text-3xl font-bold text-center text-white">Join MediStore</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-widest font-bold">Full Name</label>
            <input
              required
              className="w-full border border-zinc-700 px-4 py-3 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-widest font-bold">Email</label>
            <input
              required
              type="email"
              className="w-full border border-zinc-700 px-4 py-3 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-widest font-bold">Password</label>
            <input
              required
              type="password"
              className="w-full border border-zinc-700 px-4 py-3 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-widest font-bold">I am a...</label>
            <select
              className="w-full border border-zinc-700 px-4 py-3 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            >
              <option value="customer">Customer (Buying Medicine)</option>
              <option value="seller">Seller (Pharmacy Owner)</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-500 transition-all disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register Now"}
        </button>

        <p className="text-center text-zinc-500 text-sm">
          Already a member? 
          <span className="text-blue-400 cursor-pointer ml-1 hover:underline" onClick={() => router.push('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
}