"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeedbackSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://medistore-backend-production.up.railway.app/api/feedback")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Community Feedback 💬
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
          See what our customers are saying about our medicines and service.
        </p>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                “{rev.message}”
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {rev.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {rev.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-14">
          <Link
            href="/feedback"
            className="inline-block px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Give us feedback
          </Link>
        </div>
      </div>
    </section>
  );
}
