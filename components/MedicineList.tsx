"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MedicineCard from "./MedicineCard";
import { IMedicine } from "@/types/medicine";

interface MedicineListProps {
  limit?: number;
  title?: string;
}

export default function MedicineList({ limit, title }: MedicineListProps) {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://medistore-backend-production.up.railway.app/api/medicines/all")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setMedicines(limit ? list.slice(0, limit) : list);
      })
      .catch(() => {
        setError("Could not load medicines. Make sure backend is running.");
      });
  }, [limit]);

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">{error}</p>
    );
  }

  if (medicines.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No medicines available.
      </p>
    );
  }

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        {title && (
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse trusted medicines from verified sellers and get them
              delivered safely.
            </p>
          </div>
        )}

        {/* Medicines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {medicines.map((med) => (
            <MedicineCard key={med._id} medicine={med} />
          ))}
        </div>

        {/* View More Button – only show on limited view */}
        {limit && (
          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-block px-10 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              View More Medicines →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
