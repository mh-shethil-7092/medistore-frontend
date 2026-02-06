interface Medicine {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  medicines: Medicine[];
  onEdit: (med: Medicine) => void;
  onDelete: (id: string) => void;
}

export default function MedicineList({ medicines, onEdit, onDelete }: Props) {
  return (
    <div className="grid gap-4">
      {medicines.map((med) => (
        <div key={med._id} className="flex justify-between bg-zinc-800 p-4 rounded">

          <div className="flex items-center gap-4">
            <img src={med.image} className="w-14 h-14 rounded" />
            <div>
              <p className="font-bold">{med.name}</p>
              <p className="text-sm text-zinc-400">${med.price}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => onEdit(med)} className="text-blue-400">
              Edit
            </button>

            <button onClick={() => onDelete(med._id)} className="text-red-400">
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
