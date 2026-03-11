import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-xl space-y-3">
      <Image
        src="/hero-section.svg"
        alt="Category Image"
        width={200}
        height={200}
        className="object-cover rounded-xl"
      />

      <div>
        <h3 className="text-center mt-5 text-xl font-medium text-[#DE87CF]">
          {category.name}
        </h3>
        <p className="text-[#242424] text-pretty text-center mt-2">
          {category.description}
        </p>
      </div>

      <Link
        href={`/categories/${category.id}`}
        className="bg-[#BBFF63] p-2 rounded-xl text-[#242323] mt-auto"
      >
        <p>Переглянути категорію </p>
      </Link>
    </div>
  );
}
