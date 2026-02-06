"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", role: "", message: "" });

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.message) return alert("All fields required!");

    try {
      await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/"); // redirect after submit
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Give Us Your Feedback</h2>
      <form onSubmit={submitFeedback} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="input w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role (Customer / Seller)"
          className="input w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <textarea
          placeholder="Your Feedback"
          className="textarea w-full"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-full">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
