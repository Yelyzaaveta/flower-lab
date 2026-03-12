import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Lab | Головна сторінка каталогу",
  description:
    "Магазин квітів Flower Lab — стильні букети, свіжі квіти та композиції для будь-якої події. Замовляйте квіти онлайн з доставкою та даруйте емоції близьким.",
};

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 text-black font-inter bg-[#E55473]/10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
