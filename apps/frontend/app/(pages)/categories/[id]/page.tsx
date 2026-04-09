import { getCategoryById, getCategoryBouquets } from "@/app/api/categories";
import BackToMainBtn from "@/components/back-to-main-btn";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import CategoryCharacteristicsSection from "./_components/category-section";
import BouquetsCardsSection from "@/app/(pages)/_components/catalog-section/bouquetes-cards-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Lab | Категорія букетів",
  description:
    "Категорія букетів у нашому квітковому магазині. Обирайте свіжі квіти, авторські композиції та замовляйте доставку для особливих моментів.",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);
  const { data: bouquets } = await getCategoryBouquets(id);

  return (
    <MaxWidthWrapper>
      <BackToMainBtn />
      <CategoryCharacteristicsSection category={category} />
      {bouquets.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#4A4A4A] mb-8">Букети в цій категорії</h2>
          <BouquetsCardsSection
            bouquets={bouquets}
            categorySlug={category.slug}
            categoryName={category.name}
          />
        </div>
      )}
    </MaxWidthWrapper>
  );
}
