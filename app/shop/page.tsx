"use client";
import { useEffect, useState } from "react";
import MedicineCard from "@/components/MedicineCard";
import { IMedicine } from "@/types/medicine";

export default function ShopPage() {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines/all")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.error("Error loading shop:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Available Medicines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <MedicineCard key={med._id} medicine={med} />
        ))}
      </div>
    </div>
  );
}