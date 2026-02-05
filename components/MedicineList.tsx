"use client";
import { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";
import { IMedicine } from "@/types/medicine";

interface MedicineListProps {
  limit?: number; // Optional: show only a few on home page
  title?: string;
}

export default function MedicineList({ limit, title }: MedicineListProps) {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Matches your backend route
    fetch("http://localhost:5000/api/medicines/all")
      .then((res) => {
        if (!res.ok) throw new Error("Server returned 404 or 500");
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        // If a limit is provided, only show that many (e.g., top 3 for Home)
        setMedicines(limit ? list.slice(0, limit) : list);
      })
      .catch((err) => {
        console.error("Error loading medicines:", err);
        setError("Could not load medicines. Check if backend is running.");
      });
  }, [limit]);

  if (error) return <p className="text-red-500 mb-4">{error}</p>;
  if (medicines.length === 0) return <p className="text-zinc-500">No medicines available.</p>;

  return (
    <section>
      {title && <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <MedicineCard key={med._id} medicine={med} />
        ))}
      </div>
    </section>
  );
}