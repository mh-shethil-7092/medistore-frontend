import { IMedicine } from "@/types/medicine";

export default function MedicineCard({ medicine }: { medicine: IMedicine }) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-900 shadow-sm hover:shadow-md transition">
      {/* Display the ImgBB image */}
      <img 
        src={medicine.image} 
        alt={medicine.name} 
        className="w-full h-48 object-cover rounded-md mb-4" 
      />
      <h3 className="text-lg font-semibold text-white">{medicine.name}</h3>
      <p className="text-gray-400 text-sm mb-2">{medicine.genericName}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-blue-400 font-bold">${medicine.price}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
}