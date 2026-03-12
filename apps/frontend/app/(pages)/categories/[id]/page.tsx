import { getCategoryById } from "@/app/api/categories";
import BackToMainBtn from "@/components/back-to-main-btn";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import CategoryCharacteristicsSection from "./_components/category-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Lab | Категорія букетів",
  description:
    "Категорія букетів у нашому квітковому магазині. Обирайте свіжі квіти, авторські композиції та замовляйте доставку для особливих моментів.",
};

export default async function BouquetProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  return (
    <MaxWidthWrapper>
      <BackToMainBtn />
      <CategoryCharacteristicsSection category={category} />
    </MaxWidthWrapper>
  );
}
