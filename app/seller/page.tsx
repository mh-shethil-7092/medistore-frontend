"use client";
import { useState, useEffect, useCallback } from "react";

interface Medicine {
  _id: string;
  name: string;
  genericName: string;
  price: number;
  image: string;
  category: string;
}

export default function SellerDashboard() {
  const [loading, setLoading] = useState(false);
  const [myMedicines, setMyMedicines] = useState<Medicine[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null); // Tracks if we are editing
  
  // State for the form fields
  const [form, setForm] = useState({
    name: "",
    genericName: "",
    price: "",
    category: "Painkillers",
  });

  const IMGBB_API_KEY = "71f1c6430490a811cd91b459b5e5e61e";

  const fetchMedicines = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/medicines/all");
      const data = await res.json();
      setMyMedicines(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  // --- DELETE LOGIC ---
  const deleteMed = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:5000/api/medicines/delete/${id}`, { 
        method: "DELETE" 
    });
    if (res.ok) {
      setMyMedicines(prev => prev.filter((m) => m._id !== id));
      alert("Medicine removed");
    }
  };

  // --- PREPARE EDIT LOGIC ---
  const startEdit = (med: Medicine) => {
    setEditingId(med._id);
    setForm({
      name: med.name,
      genericName: med.genericName,
      price: med.price.toString(),
      category: med.category,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- SUBMIT (ADD OR UPDATE) LOGIC ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;

    try {
      let imageUrl = "";

      // Only upload to ImgBB if a NEW image is selected
      if (imageFile && imageFile.size > 0) {
        const imgFormData = new FormData();
        imgFormData.append("image", imageFile);
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: imgFormData,
        });
        const imgData = await imgRes.json();
        imageUrl = imgData.data.url;
      }

      const medicineData = {
        ...form,
        price: Number(form.price),
        ...(imageUrl && { image: imageUrl }), // Only update image if new one uploaded
      };

      const url = editingId 
        ? `http://localhost:5000/api/medicines/update/${editingId}` // Update endpoint
        : "http://localhost:5000/api/medicines/add";             // Add endpoint

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicineData),
      });

      if (res.ok) {
        alert(editingId ? "Medicine updated!" : "Medicine added!");
        setEditingId(null);
        setForm({ name: "", genericName: "", price: "", category: "Painkillers" });
        (e.target as HTMLFormElement).reset();
        fetchMedicines();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-5">
        {editingId ? "Edit Medicine" : "Add New Medicine"}
      </h1>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg grid gap-4 mb-10">
        <input 
          placeholder="Medicine Name" 
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required 
        />
        <input 
          placeholder="Generic Name" 
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={form.genericName}
          onChange={(e) => setForm({...form, genericName: e.target.value})}
          required 
        />
        <input 
          type="number" 
          placeholder="Price" 
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
          required 
        />
        <select 
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
        >
          <option value="Painkillers">Painkillers</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
        </select>
        
        <label className="text-sm text-zinc-400">
          {editingId ? "Update Image (Optional)" : "Medicine Image"}
        </label>
        <input type="file" name="image" className="text-sm" required={!editingId} />

        <div className="flex gap-2">
          <button 
            disabled={loading} 
            className="flex-1 bg-blue-600 p-2 rounded hover:bg-blue-700 disabled:bg-zinc-700"
          >
            {loading ? "Processing..." : editingId ? "Update Medicine" : "List Medicine"}
          </button>
          {editingId && (
            <button 
              type="button"
              onClick={() => {setEditingId(null); setForm({name:"", genericName:"", price:"", category:"Painkillers"})}}
              className="px-4 bg-zinc-700 rounded hover:bg-zinc-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST SECTION */}
      <h2 className="text-xl mb-4">Your Inventory</h2>
      <div className="grid gap-4">
        {myMedicines.map((med) => (
          <div key={med._id} className="flex justify-between bg-zinc-800 p-4 rounded items-center border border-zinc-700">
            <div className="flex items-center gap-4">
              <img src={med.image} alt="" className="w-14 h-14 object-cover rounded shadow-lg" />
              <div>
                <p className="font-bold">{med.name}</p>
                <p className="text-sm text-zinc-400">${med.price}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => startEdit(med)} 
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteMed(med._id)} 
                className="text-red-500 hover:text-red-400 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}