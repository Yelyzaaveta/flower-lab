"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/app/api/auth";
import type { AdminData } from "@/lib/types/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data }: { data: AdminData } = await login(email, password);

      localStorage.setItem("admin", JSON.stringify(data));

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Сталася помилка. Будь ласка, спробуйте ще раз");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть емейл"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть пароль"
          required
          disabled={loading}
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-fit self-center px-10 py-5 bg-[#E55473] text-white font-semibold text-lg rounded-lg shadow-md hover:bg-[#d94366] focus:outline-none focus:ring-2 focus:ring-[#E55473]/50 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        disabled={loading}
      >
        {loading ? "Вхід..." : "Увійти"}
      </Button>
    </form>
  );
}
