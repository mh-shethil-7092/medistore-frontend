"use client";

import { useState, useEffect, useCallback } from "react";
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";

export default function SellerDashboard() {
  const [loading, setLoading] = useState(false);
  const [myMedicines, setMyMedicines] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    genericName: "",
    price: "",
    category: "Painkillers",
  });

  const fetchMedicines = useCallback(async () => {
    const res = await fetch("http://localhost:5000/api/medicines/all");
    const data = await res.json();
    setMyMedicines(data);
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const deleteMed = async (id: string) => {
    await fetch(`http://localhost:5000/api/medicines/delete/${id}`, { method: "DELETE" });
    fetchMedicines();
  };

  const startEdit = (med: any) => {
    setEditingId(med._id);
    setForm({
      name: med.name,
      genericName: med.genericName,
      price: med.price.toString(),
      category: med.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", genericName: "", price: "", category: "Painkillers" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `http://localhost:5000/api/medicines/update/${editingId}`
      : "http://localhost:5000/api/medicines/add";

    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });

    cancelEdit();
    fetchMedicines();
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl mb-5">{editingId ? "Edit Medicine" : "Add Medicine"}</h1>

      <MedicineForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        loading={loading}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
      />

      <MedicineList
        medicines={myMedicines}
        onEdit={startEdit}
        onDelete={deleteMed}
      />
    </div>
  );
}
