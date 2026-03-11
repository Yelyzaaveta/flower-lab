import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flower Lab | Головна сторінка каталогу",
  description:
    "Магазин квітів Flower Lab — стильні букети, свіжі квіти та композиції для будь-якої події. Замовляйте квіти онлайн з доставкою та даруйте емоції близьким.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E55473]/10`}
      >
        {children}
      </body>
    </html>
  );
}
