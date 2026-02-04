"use client";
import { useEffect, useState } from "react";
import MedicineCard from "@/components/MedicineCard";
import { IMedicine } from "@/types/medicine";

export default function ShopPage() {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines/all")
      .then((res) => {
        if (!res.ok) throw new Error("Server returned 404 or 500");
        return res.json();
      })
      .then((data) => setMedicines(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error loading shop:", err);
        setError("Could not load medicines. Check if backend is running.");
      });
  }, []);

  return (
    <div className="p-8 min-h-screen bg-zinc-950">
      <h1 className="text-2xl font-bold mb-6 text-white">Available Medicines</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <MedicineCard key={med._id} medicine={med} />
        ))}
      </div>
      
      {medicines.length === 0 && !error && (
        <p className="text-zinc-500">No medicines available in the shop.</p>
      )}
    </div>
  );
}