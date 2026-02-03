"use client";
import { useState } from "react";

export default function SellerDashboard() {
  const [loading, setLoading] = useState(false);
  const IMGBB_API_KEY = "71f1c6430490a811cd91b459b5e5e61e"; // From your screenshot

  const handleAddMedicine = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;

    try {
      // 1. Upload to ImgBB
      const imgFormData = new FormData();
      imgFormData.append("image", imageFile);

      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: imgFormData,
      });
      const imgData = await imgRes.json();
      const imageUrl = imgData.data.url;

      // 2. Send to your Backend
      const medicineData = {
        name: formData.get("name"),
        genericName: formData.get("genericName"),
        price: Number(formData.get("price")),
        availability: true,
        image: imageUrl,
        category: formData.get("category"),
      };

      const res = await fetch("http://localhost:5000/api/medicines/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicineData),
      });

      if (res.ok) alert("Medicine added successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Add New Medicine</h1>
      <form onSubmit={handleAddMedicine} className="flex flex-col gap-4">
        <input name="name" placeholder="Medicine Name" className="border p-2 rounded" required />
        <input name="genericName" placeholder="Generic Name (e.g. Paracetamol)" className="border p-2 rounded" required />
        <input name="price" type="number" placeholder="Price" className="border p-2 rounded" required />
        <select name="category" className="border p-2 rounded">
          <option value="Painkillers">Painkillers</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
        </select>
        <input name="image" type="file" accept="image/*" className="border p-2" required />
        <button disabled={loading} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
          {loading ? "Uploading..." : "List Medicine"}
        </button>
      </form>
    </div>
  );
}