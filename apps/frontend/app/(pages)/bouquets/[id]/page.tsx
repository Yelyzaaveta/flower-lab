import { getBouquetById } from "@/app/api/bouquets";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import BouquetCharacteristicsSection from "./_components/bouquet-section";
import BackToMainBtn from "@/components/back-to-main-btn";
import RelatedBouquetesSection from "./_components/related-bouquetes";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Flower Lab | Обрана квітковa композиція",
  description:
    "Квіткова композиція з нашого магазину — стильне поєднання свіжих квітів для особливих моментів. Ідеальний подарунок",
};

export default async function BouquetProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string; categoryName?: string }>;
}) {
  const { id } = await params;
  const { category, categoryName } = await searchParams;
  const { data, relatedBouquets } = await getBouquetById(id);

  return (
    <MaxWidthWrapper className="pt-5">
      <div className="flex justify-between w-full">
        <BackToMainBtn />
        <Link
          href={"/florist/anna-koval"}
          className="cursor-pointer bg-white rounded-xl p-2 text-[#E55473]"
        >
          Переглянути профіль флориста
        </Link>
      </div>
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          ...(category && categoryName
            ? [{ label: categoryName, href: `/categories/${category}` }]
            : [{ label: "Букети" }]),
          { label: `${data.name}`, href: `/bouquets/${data.slug}` },
        ]}
      />
      <BouquetCharacteristicsSection bouquet={data} />
      <RelatedBouquetesSection relatedBouquet={relatedBouquets} />
    </MaxWidthWrapper>
  );
}
