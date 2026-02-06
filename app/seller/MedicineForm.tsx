"use client";

interface Props {
  form: any;
  setForm: any;
  editingId: string | null;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cancelEdit: () => void;
}

export default function MedicineForm({
  form,
  setForm,
  editingId,
  loading,
  handleSubmit,
  cancelEdit,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg grid gap-4 mb-10">

      <input
        placeholder="Medicine Name"
        className="p-2 rounded bg-zinc-800 border border-zinc-700"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        placeholder="Generic Name"
        className="p-2 rounded bg-zinc-800 border border-zinc-700"
        value={form.genericName}
        onChange={(e) => setForm({ ...form, genericName: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Price"
        className="p-2 rounded bg-zinc-800 border border-zinc-700"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      <select
        className="p-2 rounded bg-zinc-800 border border-zinc-700"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="Painkillers">Painkillers</option>
        <option value="Antibiotics">Antibiotics</option>
        <option value="Vitamins">Vitamins</option>
      </select>

      <label className="text-sm text-zinc-400">
        {editingId ? "Update Image (Optional)" : "Medicine Image"}
      </label>

      <input type="file" name="image" required={!editingId} />

      <div className="flex gap-2">
        <button disabled={loading} className="flex-1 bg-blue-600 p-2 rounded">
          {editingId ? "Update Medicine" : "Add Medicine"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEdit} className="px-4 bg-zinc-700 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
