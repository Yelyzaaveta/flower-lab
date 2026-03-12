import BouquetCard from "@/components/bouquet-card";
import { Bouquet, BouquetWithRelated } from "@/lib/types/bouquet";

interface RelatedBouquetes {
  relatedBouquet: Bouquet[];
}

export default function RelatedBouquetesSection({
  relatedBouquet,
}: RelatedBouquetes) {
  return (
    <section className="mt-20">
      <h2 className="text-3xl text-center text-[#272727] font-extrabold mb-10">
        Bам також може сподобатись
      </h2>

      <div className="grid grid-cols-3">
        {relatedBouquet.map((bouquet) => (
          <BouquetCard key={bouquet.id} bouquet={bouquet}/>
        ))}
      </div>
    </section>
  );
}
