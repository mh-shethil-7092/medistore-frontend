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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful. Please login.");
    router.push("/login");
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

        <input
          className="w-full border px-4 py-2 rounded bg-white text-gray-900 placeholder:text-gray-400"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full border px-4 py-2 rounded bg-white text-gray-900 placeholder:text-gray-400"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full border px-4 py-2 rounded bg-white text-gray-900 placeholder:text-gray-400"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Register as
          </label>
          <select
            className="w-full border px-4 py-2 rounded bg-white text-gray-900"
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

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-xs text-center text-gray-500">
          Admin accounts are created by the system
        </p>
      </form>
    </div>
  );
}
