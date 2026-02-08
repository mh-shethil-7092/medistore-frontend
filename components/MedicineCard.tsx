"use client";

import { useCart } from "@/context/CartContext";
import { IMedicine } from "@/types/medicine";

export default function MedicineCard({ medicine }: { medicine: IMedicine }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      _id: medicine._id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      quantity: 1,
    } as any);

    alert(`${medicine.name} added to cart!`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-full h-44 object-cover rounded-xl mb-4"
      />

      {/* Info */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {medicine.name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {medicine.genericName}
      </p>

      {/* Price + Action */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          ৳{medicine.price}
        </span>

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
