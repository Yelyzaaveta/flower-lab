import { getBouquets } from "@/app/api/bouquets";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import { Breadcrumbs } from "@/components/breadcrumbs";
import BouquetsCardsSection from "@/app/(pages)/_components/catalog-section/bouquetes-cards-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Lab | Букети",
  description:
    "Каталог букетів у квітковому магазині Flower Lab. Обирайте свіжі квіти, авторські композиції та замовляйте доставку.",
};

export default async function BouquetsPage() {
  const response = await getBouquets({ limit: 100 });

  return (
    <MaxWidthWrapper className="pt-5">
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          { label: "Букети", href: "/bouquets" },
        ]}
      />
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-[#4A4A4A] mb-8">Всі букети</h1>
        <BouquetsCardsSection bouquets={response.data} />
      </div>
    </MaxWidthWrapper>
  );
}
