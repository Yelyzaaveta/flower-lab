import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default function BackToMainBtn() {
  return (
    <Link
      href="/"
      className="flex w-fit h-10 rounded-xl bg-white/80 p-3 flex justify-center items-center space-x-3"
    >
      <ArrowLeftCircle />
      <p>Повернутися на головну</p>
    </Link>
  );
}
