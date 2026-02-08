import Link from "next/link";
import { User } from "./Navbar";
import CartBadge from "./CartBadge";

export default function NavLinks({
  user,
  cartCount,
}: {
  user: User | null;
  cartCount: number;
}) {
  return (
    <>
      <Link href="/shop" className="text-zinc-300 hover:text-white">
        Shop
      </Link>

      {user && user.role === "customer" && (
        <Link href="/customer" className="relative text-zinc-300 hover:text-white">
          Cart
          <CartBadge count={cartCount} />
        </Link>
      )}

      {!user && (
        <>
          <Link href="/login" className="text-zinc-300">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 px-3 py-1.5 rounded text-white"
          >
            Register
          </Link>
        </>
      )}
    </>
  );
}
