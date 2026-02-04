"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "customer" | "seller";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" as Role,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      // ✅ FIX 1: Auto-Login after registration
      // We save the token and user data returned by your updated backend
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ FIX 2: Trigger Navbar update instantly
      // This tells your Navbar to show the profile icon instead of Login/Register
      window.dispatchEvent(new Event("auth-change"));

      alert("Registration successful! Redirecting...");
      
      // ✅ FIX 3: Immediate Role-Based Redirect
      if (data.user.role === "seller") {
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Is your backend running?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create MediStore Account
        </h2>

        {/* Full Name Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Full Name</label>
          <input
            required
            className="w-full border px-4 py-2 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Email Address</label>
          <input
            required
            type="email"
            className="w-full border px-4 py-2 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Password</label>
          <input
            required
            type="password"
            className="w-full border px-4 py-2 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">
            Register as
          </label>
          <select
            className="w-full border px-4 py-2 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as Role,
              })
            }
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-xs text-center text-gray-500">
          Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => router.push('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
}