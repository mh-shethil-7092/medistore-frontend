"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
  });

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.message) {
      alert("All fields are required!");
      return;
    }

    try {
      await fetch("https://medistore-backend-production.up.railway.app/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          We’d Love Your Feedback 💙
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-2 mb-8">
          Your feedback helps us improve our service and serve you better.
        </p>

        {/* Form */}
        <form onSubmit={submitFeedback} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Your Role (Customer / Seller)"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <textarea
            placeholder="Share your experience with us..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}
