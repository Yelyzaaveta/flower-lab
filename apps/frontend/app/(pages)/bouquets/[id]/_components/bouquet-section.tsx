import { BouquetWithRelated } from "@/lib/types/bouquet";
import { Quote } from "lucide-react";
import Image from "next/image";

interface SectionProps {
  bouquet: BouquetWithRelated;
}
export default function BouqueCharacteristicsSection({
  bouquet,
}: SectionProps) {
  return (
    <section className="flex justify-between">
      <div className="relative">
        <div className="absolute top-5 -right-6 w-fit px-3 py-2 rounded-xl bg-[#9AF24B] text-[#4A4747] font-medium">
          {bouquet.data.category}
        </div>
        <Image
          src={"/hero-section.svg"}
          alt="Bouquet Image"
          height={400}
          width={500}
          className="object-cover rounded-xl mt-10 rounded-xl overflow-hidden"
        />
      </div>

      <div className="flex flex-col space-y-3 max-w-200 mt-10">
        <h1 className="text-5xl font-bold text-[#4A4A4A] text-center">
          {bouquet.data.name}
        </h1>
        <div className="relative">
          <Quote className="absolute top-4 -left-2 w-8 h-8 text-pink-400" />

          <p className="mt-6 bg-white rounded-3xl p-5 text-[#242424] text-lg">
            {bouquet.data.longDescription}
          </p>
        </div>

        <p className="flex items-center text-lg mt-10">
          Кількість квітів у букеті:{" "}
          <span className="ml-3 text-2xl font-semibold text-[#4A4A4A]">
            {bouquet.data.flowersAmount} шт.
          </span>
        </p>
        <p className="mt-5 flex text-lg items-center justify-center rounded-xl py-3 px-5 bg-white/50 w-fit">
          Ціна:{" "}
          <span className="font-semibold text-[32px] ml-5 text-[#D65CBE]">
            {bouquet.data.price} ₴
          </span>
        </p>
      </div>
    </section>
  );
}
