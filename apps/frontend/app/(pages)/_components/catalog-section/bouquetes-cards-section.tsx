import BouquetCard from "@/components/bouquet-card";
import { Bouquet } from "@/lib/types/bouquet";

interface BouqutesCardsSectionProps {
  bouquets: Bouquet[];
  categorySlug?: string;
  categoryName?: string;
}

export default function BouqutesCardsSection({
  bouquets,
  categorySlug,
  categoryName,
}: BouqutesCardsSectionProps) {
  return (
    <section>
      <div className="grid lg:grid-cols-3 gap-3">
        {bouquets.map((bouquet) => (
          <BouquetCard
            key={bouquet.id}
            bouquet={bouquet}
            categorySlug={categorySlug}
            categoryName={categoryName}
          />
        ))}
      </div>
    </section>
  );
}
