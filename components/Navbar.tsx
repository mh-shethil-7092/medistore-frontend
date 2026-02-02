"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  role: "admin" | "seller" | "customer";
};

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Load auth state safely (no flicker)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    setMounted(true);
  }, []);

  // Close dropdown on outside click
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
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  // 🔥 Prevent hydration flicker
  if (!mounted) {
    return (
      <div className="h-14 bg-zinc-900 border-b border-zinc-800" />
    );
  }

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          MediStore 💊
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/shop"
            className="text-zinc-300 hover:text-white transition"
          >
            Shop
          </Link>

          {/* Guest */}
          {!user && (
            <>
              <Link
                href="/login"
                className="text-zinc-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged in */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold uppercase">
                  {user.name.charAt(0)}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-400 capitalize">
                      {user.role}
                    </p>
                  </div>

                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin"
                        : user.role === "seller"
                        ? "/seller"
                        : "/customer"
                    }
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700"
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
