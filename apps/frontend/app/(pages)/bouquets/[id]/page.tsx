import { getBouquetById } from "@/app/api/bouquets";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import BouquetCharacteristicsSection from "./_components/bouquet-section";
import BackToMainBtn from "@/components/back-to-main-btn";
import RelatedBouquetesSection from "./_components/related-bouquetes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Lab | Обрана квітковa композиція",
  description:
    "Квіткова композиція з нашого магазину — стильне поєднання свіжих квітів для особливих моментів. Ідеальний подарунок",
};

export default async function BouquetProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { data, relatedBouquets } = await getBouquetById(id);

  return (
    <MaxWidthWrapper className="pt-5">
      <BackToMainBtn />
      <BouquetCharacteristicsSection bouquet={data} />
      <RelatedBouquetesSection relatedBouquet={relatedBouquets} />
    </MaxWidthWrapper>
  );
}
