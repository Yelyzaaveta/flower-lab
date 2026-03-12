"use client";

import { useEffect, useState } from "react";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import { getCategories } from "@/app/api/categories";
import { Category } from "@/lib/types/category";
import CategoryCard from "./category-card";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <MaxWidthWrapper className="flex flex-col space-y-10">
      <h2 className="text-5xl self-center text-[#272727] font-extrabold">Категорії</h2>

      <div className="grid lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
