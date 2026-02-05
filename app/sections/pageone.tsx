"use client";

export default function ReviewSection() {
  const reviews = [
    { name: "John Doe", role: "Customer", text: "Great prices and fast delivery!", initial: "JD" },
    { name: "MedPharm", role: "Seller", text: "The dashboard is very easy to use.", initial: "MP" },
    { name: "Sarah A.", role: "Admin", text: "Authentic medicines guaranteed.", initial: "SA" },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Community Feedback 💬</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition">
            <div className="flex text-yellow-500 mb-2">★★★★★</div>
            <p className="text-gray-300 italic mb-4">"{rev.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {rev.initial}
              </div>
              <div>
                <p className="text-sm font-semibold">{rev.name}</p>
                <p className="text-xs text-zinc-500">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}