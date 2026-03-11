"use client";
import { Search, User } from "lucide-react";
import Link from "next/link";
// import { SearchDrawer } from "./search-drawer";
import { useState } from "react";

export default function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const closeDrawer = () => setOpenDrawer(false);
  return (
    <header className="h-20 bg-[#E55473]/70 p-10 flex items-center justify-between">
      <p className="text-xl text-white">Flower Lab</p>
      {/* <SearchDrawer isOpen={openDrawer} onClose={closeDrawer} /> */}
      <Link href={"/auth/login"}>
        <User color="white" className="cursor-pointer" />
      </Link>
    </header>
  );
}
