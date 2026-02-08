"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://medistore-backend-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 1. Save to LocalStorage (for client-side state)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 2. Save to Cookies (REQUIRED for Middleware to work)
      // Expires in 7 days
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
      Cookies.set("token", data.token, { expires: 7 });

      // 3. Update UI components (Navbar, etc.)
      window.dispatchEvent(new Event("auth-change"));

      // 4. Redirect and Force Refresh
      // Refreshing ensures the server-side middleware sees the new cookie
      router.push(`/`);
      router.refresh();
      
    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-zinc-400 text-sm">Login to manage your health needs</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="email"
            className="w-full border border-zinc-700 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Email Address"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border border-zinc-700 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-500 transition-all disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p className="text-center text-zinc-500 text-sm">
                not have an account? 
          <span className="text-blue-400 cursor-pointer ml-1 hover:underline" onClick={() => router.push('/register')}>Register</span>
        </p>
      </form>
    </div>
  );
}