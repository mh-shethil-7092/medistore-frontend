export default function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] px-2 rounded-full">
      {count}
    </span>
  );
}
