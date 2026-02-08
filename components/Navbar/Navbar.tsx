"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCart } from "@/context/CartContext";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

export type User = {
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
          <NavLinks user={user} cartCount={cartCount} />
          {user && (
            <UserMenu
              user={user}
              open={open}
              setOpen={setOpen}
              onLogout={logout}
              dropdownRef={dropdownRef}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
