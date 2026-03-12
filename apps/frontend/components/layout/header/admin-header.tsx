"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/api/auth";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); 
    router.push("/");
    router.refresh();
  };

  return (
    <header className="h-20 bg-[#E55473]/50 px-10 flex items-center justify-between">
      <Link href="/">
        <p className="text-xl text-white font-semibold cursor-pointer">
          Flower Lab
        </p>
      </Link>

      <button onClick={handleLogout}>
        <LogOut
          color="white"
          className="cursor-pointer hover:opacity-80 transition"
        />
      </button>
    </header>
  );
}
