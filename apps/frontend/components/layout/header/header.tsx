"use client";
import { Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchDrawer } from "./search-drawer";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="h-20 bg-[#E55473]/50 p-10 flex items-center justify-between">
      <p className="text-xl text-white">Flower Lab</p>

      <div className="flex space-x-5 items-center">
        <Link
          href={"/about-us"}
          className="cursor-pointer bg-white rounded-xl p-2 text-[#E55473]"
        >
          About us
        </Link>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="cursor-pointer"
        >
          <Search className="w-5 h-5" color="white" />
        </button>

        <Link href={"/auth/login"}>
          <User color="white" className="cursor-pointer" />
        </Link>
      </div>
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
