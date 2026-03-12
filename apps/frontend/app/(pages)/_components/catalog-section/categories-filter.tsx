"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getCategories } from "@/app/api/categories";
import { Category } from "@/lib/types/category";

interface CategoriesFilterProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export default function CategoriesFilter({
  selectedCategories,
  onChange,
}: CategoriesFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const toggleCategory = (name: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedCategories, name]);
    } else {
      onChange(selectedCategories.filter((c) => c !== name));
    }
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center space-x-2 capitalize"
        >
          <Checkbox
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.name)}
            onCheckedChange={(checked) =>
              toggleCategory(category.name, Boolean(checked))
            }
          />

          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
        </div>
      ))}
    </div>
  );
}
