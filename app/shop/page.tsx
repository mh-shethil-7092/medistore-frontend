"use client";
import MedicineList from "@/components/MedicineList";

export default function ShopPage() {
  return (
    <div className="p-8 min-h-screen bg-zinc-950">
      <h1 className="text-3xl font-bold mb-8 text-white">All Available Medicines</h1>
      
      {/* No limit here so it shows everything */}
      <MedicineList />
    </div>
  );
}