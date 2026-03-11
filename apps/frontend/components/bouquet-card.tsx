import { Bouquet } from "@/lib/types/bouquet";
import Image from "next/image";
import Link from "next/link";

interface BouquteCardProps {
  bouquet: Bouquet;
}

export default function BouquetCard({ bouquet }: BouquteCardProps) {
  return (
    <div className="bg-white p-3 flex flex-col items-center rounded-2xl lg:w-90 2xl:w-100 ">
      <Image
        src="/hero-section.svg"
        alt="Bouquet Image"
        width={300}
        height={300}
        className="object-cover rounded-xl"
      />

      <div className="flex flex-col space-y-3">
        <h3 className="text-center mt-5 text-xl font-medium text-[#DE87CF]">
          {bouquet.name}
        </h3>
        <p className="text-[#242424] text-pretty">{bouquet.shortDescription}</p>
      </div>
      <div className="flex items-center space-x-20 mt-5">
        <p className="text-lg">
          Ціна: <span className="font-medium text-xl">{bouquet.price} ₴</span>
        </p>

        <Link
          href={`/bouquets/${bouquet.id}`}
          className="bg-[#BBFF63] p-2 rounded-xl text-[#242323]"
        >
          <p>Переглянути</p>
        </Link>
      </div>
    </div>
  );
}
