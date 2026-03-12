import { Lock } from "lucide-react";
import type { Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Вхід | Адмін панель - Flower Lab",
  description:
    "Введіть логін та пароль, щоб увійти в акаунт і користуватися зручною адмін панеллю у Flower Lab.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-8 bg-white rounded-xl">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 mt-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
            <Lock className="h-10 w-10 text-black" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Аутентифікація користувача
          </h1>
          <p className="text-black-800">
            Увійдіть, щоб отримати доступ до панелі адміністратора
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-8 pt-4">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
