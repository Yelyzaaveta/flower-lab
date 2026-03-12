import { Bouquet, UpdateBouquetData } from "@/lib/types/bouquet";
import Image from "next/image";
import { SquarePen } from "lucide-react";
import DeleteAlert from "./delete-alert";
import CharacteristicItem from "../characteristic-item";
import UpdateBouquetDialog from "./update-bouquet-dialog";

interface BouquteCardProps {
  bouquet: Bouquet;
  handleDelete?: (id: number) => void;
  onUpdate?: (updateBouquet: UpdateBouquetData) => void;
}

export default function BouquetCard({
  bouquet,
  handleDelete,
  onUpdate,
}: BouquteCardProps) {
  return (
    <div className="relative bg-white p-3 flex items-center rounded-2xl w-full pr-6">
      <Image
        src={bouquet.imgUrl}
        alt="Bouquet Image"
        width={300}
        height={300}
        className=" object-cover  w-[400px] h-[300px] rounded-xl mr-10"
      />

      <div className="flex flex-col ml-5 mt-5 self-start">
        <h3 className="text-center my-5 text-[32px] font-medium text-[#DE87CF]">
          {bouquet.name}
        </h3>
        <CharacteristicItem
          label="Короткий опис:"
          value={bouquet.shortDescription}
        />
        <CharacteristicItem
          label="Повний опис:"
          value={bouquet.longDescription}
        />
        <CharacteristicItem label="Категорія:" value={bouquet.category} />
        <CharacteristicItem label="Вартість:" value={String(bouquet.price)} />
        <CharacteristicItem
          label="Кількість квітів у букеті:"
          value={String(bouquet.flowersAmount)}
        />
      </div>

      <div className="absolute top-4 right-4 flex gap-3">
        <DeleteAlert handleDelete={handleDelete} bouquet={bouquet} />
        <UpdateBouquetDialog
          bouquet={bouquet}
          onUpdate={onUpdate || (() => {})}
        />
      </div>
    </div>
  );
}
