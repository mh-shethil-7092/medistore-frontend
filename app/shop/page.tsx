"use client";

import MedicineList from "@/components/MedicineList";

export default function ShopPage() {
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            All Available Medicines
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our complete collection of trusted medicines from verified
            sellers. Safe, reliable, and delivered with care.
          </p>
        </div>

        {/* Medicine List (no limit = all items) */}
        <MedicineList />
      </div>
    </section>
  );
}
