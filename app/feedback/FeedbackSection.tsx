"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // <- import Link for navigation

export default function FeedbackSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="space-y-6 mt-10">
      <h2 className="text-3xl font-bold text-center">Community Feedback 💬</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
          >
            <p className="text-gray-300 mb-4">“{rev.message}”</p>
            <div>
              <p className="font-semibold">{rev.name}</p>
              <p className="text-xs text-zinc-500">{rev.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add button to go to feedback form */}
      <div className="text-center mt-6">
        <Link
          href="/feedback"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Give us feedback
        </Link>
      </div>
    </section>
  );
}
