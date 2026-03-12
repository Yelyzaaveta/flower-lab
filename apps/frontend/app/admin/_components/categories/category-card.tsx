import { Category, UpdateCategoryData } from "@/lib/types/category";
import { SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import CharacteristicItem from "../characteristic-item";
import DeleteAlert from "./delete-alert";
import UpdateCategoryDialog from "./update-category-dialog";

interface CategoryCardProps {
  category: Category;
  handleDelete?: (id: number) => void;
  onUpdate?: (updateCategory: UpdateCategoryData) => void;
}

export default function CategoryCard({
  category,
  handleDelete,
  onUpdate,
}: CategoryCardProps) {
  return (
    <div className="relative bg-white p-3 flex items-center rounded-2xl w-full">
      <Image
        src={category.previewImgUrl}
        alt="Bouquet Image"
        width={300}
        height={300}
        className="object-cover w-[400px] h-[300px] rounded-xl mr-10"
      />
      <div className="self-start mt-5">
        <h3 className="text-center my-5 text-xl font-medium text-[32px] text-[#DE87CF]">
          {category.name}
        </h3>

        <CharacteristicItem label="Опис:" value={category.description} />
      </div>

      <div className="absolute top-4 right-4 flex gap-3">
        <DeleteAlert handleDelete={handleDelete} category={category} />
        <UpdateCategoryDialog
          category={category}
          onUpdate={onUpdate || (() => {})}
        />
      </div>
    </div>
  );
}
