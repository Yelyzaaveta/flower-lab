import BouquetCard from "@/components/bouquet-card";
import { Bouquet } from "@/lib/types/bouquet";

interface BouqutesCardsSectionProps {
  bouquets: Bouquet[];
}

export default function BouqutesCardsSection({
  bouquets,
}: BouqutesCardsSectionProps) {
  return (
    <section>
      <div className="grid lg:grid-cols-3 gap-3">
        {bouquets.map((bouquet) => (
          <BouquetCard key={bouquet.id} bouquet={bouquet} />
        ))}
      </div>
    </section>
  );
}
