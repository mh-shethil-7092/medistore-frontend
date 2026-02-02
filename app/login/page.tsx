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
    console.log(data);

    if (!res.ok) {
      alert(data.message);
      return;
    }

   localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));


    // 🔥 ROLE BASED REDIRECT
    if (data.user.role === "admin") {
      router.push("/");
    } else if (data.user.role === "seller") {
      router.push("/");
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <input
        className="input input-bordered w-full"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-full">Login</button>
    </form>
  );
}
