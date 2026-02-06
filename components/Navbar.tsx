"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCart } from "@/context/CartContext";

type User = {
  name: string;
  role: "admin" | "seller" | "customer";
};

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const cartCount = cart.reduce(
    (acc: number, item: any) => acc + (item.quantity || 0),
    0
  );

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
    return () =>
      window.removeEventListener("auth-change", loadUser);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Cookies.remove("user", { path: "/" });
    Cookies.remove("token", { path: "/" });

    setUser(null);
    window.dispatchEvent(new Event("auth-change"));

    router.push("/login");
    router.refresh();
  };

  if (!mounted) {
    return <div className="h-14 bg-zinc-900 border-b border-zinc-800" />;
  }

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          MediStore
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/shop" className="text-zinc-300 hover:text-white">
            Shop
          </Link>

          {user && user.role === "customer" && (
            <Link href="/customer" className="relative text-zinc-300 hover:text-white">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {!user && (
            <>
              <Link href="/login" className="text-zinc-300">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 px-3 py-1.5 rounded text-white">
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)}>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-lg">
                  <Link
                    href={`/${user.role}`}
                    className="block px-4 py-2 text-zinc-300 hover:bg-zinc-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-700"
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
