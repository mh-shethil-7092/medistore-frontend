// login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Save data to storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ FIX: Trigger Navbar update immediately without reload
    window.dispatchEvent(new Event("auth-change"));

    // Role-based redirect
    if (data.user.role === "admin") {
      router.push("/");
    } else if (data.user.role === "seller") {
      router.push("/");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login to MediStore</h2>
        <input
          type="email"
          className="w-full border px-4 py-2 rounded bg-white text-gray-900"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border px-4 py-2 rounded bg-white text-gray-900"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}