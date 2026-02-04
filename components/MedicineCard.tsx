"use client";
import { useCart } from "@/context/CartContext";
import { IMedicine } from "@/types/medicine";

export default function MedicineCard({ medicine }: { medicine: IMedicine }) {
  const { addToCart } = useCart(); // ✅ Get the function from context

  const handleAdd = () => {
    console.log("Adding to cart:", medicine.name); // Debugging line
    addToCart({
      _id: medicine._id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      quantity: 1, // Default quantity
    });
    alert(`${medicine.name} added to cart!`);
  };

  return (
    <div className="border border-zinc-700 rounded-lg p-4 bg-zinc-900 shadow-sm hover:shadow-md transition">
      <img 
        src={medicine.image} 
        alt={medicine.name} 
        className="w-full h-48 object-cover rounded-md mb-4" 
      />
      <h3 className="text-lg font-semibold text-white">{medicine.name}</h3>
      <p className="text-zinc-400 text-sm mb-2">{medicine.genericName}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-blue-400 font-bold">${medicine.price}</span>
        <button 
          onClick={handleAdd} // ✅ Connect the click handler
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}