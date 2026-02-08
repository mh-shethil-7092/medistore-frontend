// user menu component for the navbar, shows the user's initial and a dropdown with dashboard and logout options
"use client";

import Link from "next/link";
import { RefObject } from "react";
import { User } from "./Navbar";

interface UserMenuProps {
  user: User;
  open: boolean;
  setOpen: (v: boolean) => void;
  onLogout: () => void;
  dropdownRef: RefObject<HTMLDivElement | null>; // allow null
}

export default function UserMenu({
  user,
  open,
  setOpen,
  onLogout,
  dropdownRef,
}: UserMenuProps) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)}>
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
          {user.name.charAt(0).toUpperCase()}
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
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
