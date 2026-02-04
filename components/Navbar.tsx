"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // ✅ Added Cart Hook

type User = {
  name: string;
  role: "admin" | "seller" | "customer";
};

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart(); // ✅ Get cart state

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Calculate total items for the badge
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    setMounted(true);
    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  if (!mounted) {
    return <div className="h-14 bg-zinc-900 border-b border-zinc-800" />;
  }

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
          MediStore <span className="text-sm bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">Plus</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="/shop" className="text-zinc-300 hover:text-white transition">
            Shop
          </Link>

          {/* Cart Icon for Customers */}
          {(!user || user.role === "customer") && (
            <Link href="/customer" className="relative text-zinc-300 hover:text-white transition">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {!user && (
            <>
              <Link href="/login" className="text-zinc-300 hover:text-white">Login</Link>
              <Link href="/register" className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 focus:outline-none">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold uppercase border-2 border-zinc-800">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in duration-150">
                  <div className="px-4 py-3 border-b border-zinc-700 bg-zinc-800/50">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-blue-400 capitalize font-mono">{user.role}</p>
                  </div>

                  <Link
                    href={user.role === "admin" ? "/admin" : user.role === "seller" ? "/seller" : "/customer"}
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition"
                    onClick={() => setOpen(false)}
                  >
                    {user.role === "seller" ? "Manage Inventory" : "My Dashboard"}
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}