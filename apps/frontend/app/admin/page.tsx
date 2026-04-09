import AdminHeader from "@/components/layout/header/admin-header";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import MainTabs from "./_components/main-tabs";
import PopulateSlugsButton from "./_components/populate-slugs-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Панель Адміністратора | Flower Lab",
  description:
    "Адмін-панель квіткового магазину. Керуйте категоріями та букетами швидко та зручно.",
};

export default function AdminPage() {
  return (
    <>
      <AdminHeader />
      <MaxWidthWrapper className="flex flex-col space-y-10">
        <h1 className="text-3xl text-center text-[#272727] font-bold">
          Оберіть категорію із запропонованих
        </h1>

        <PopulateSlugsButton />

        <MainTabs />
      </MaxWidthWrapper>
    </>
  );
}
