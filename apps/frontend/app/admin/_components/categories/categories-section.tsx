"use client";
import { useState, useEffect } from "react";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/app/api/categories";
import { Category, UpdateCategoryData } from "@/lib/types/category";
import CategoryCard from "./category-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateCategoryDialog from "./create-category-dialog";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<
    Category[] | UpdateCategoryData[]
  >([]);

  useEffect(() => {
    async function fetchBouquets() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchBouquets();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCategory = (newCategory: Category) => {
    setCategories([newCategory, ...categories]);
  };

  return (
    <div className="flex flex-col">
      <CreateCategoryDialog onCreate={handleCreateCategory} />
      <div className="flex flex-col space-y-10">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            handleDelete={handleDelete}
            onUpdate={(updatedCategory) =>
              setCategories((prev) =>
                prev.map((c) =>
                  c.id === updatedCategory.id ? updatedCategory : c,
                ),
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
