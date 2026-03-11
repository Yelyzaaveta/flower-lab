import Image from "next/image";
import { Category } from "@/lib/types/category";
import { Quote } from "lucide-react";

interface SectionProps {
  category: Category;
}

export default function CategoryCharacteristicsSection({
  category,
}: SectionProps) {
  return (
    <section className="mt-10">
      <h1 className="text-5xl text-center text-[#272727] font-bold">
        {category.name}
      </h1>

      <div className="flex space-x-25">
        <Image
          src="/hero-section.svg"
          alt="Category image"
          width={300}
          height={300}
          className="w-125 h-100 object-cover mt-10"
        />

        <div className="mt-10">
          <div className="relative max-w-200">
            <Quote className="absolute top-0 -left-2 w-8 h-8 text-pink-400" />

            <p className="mt-6 bg-white rounded-3xl p-5 text-[#242424] text-lg">
              {category.description}
            </p>
          </div>

          <p className="flex text-xl items-center mt-5">
            Ця категорія налічує:{" "}
            <span className="font-semibold text-[32px] ml-5 text-[#D65CBE]">
              {category.bouquetsAmount > 1
                ? `${category.bouquetsAmount} букетів`
                : `${category.bouquetsAmount} букет`}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
