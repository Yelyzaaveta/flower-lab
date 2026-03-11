import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import Image from "next/image";

export default function HeroSection() {
  return (
    <MaxWidthWrapper className="h-[620px] flex space-x-30 items-center">
      <div className="flex flex-col space-y-10 ml-20">
        <h1 className="text-[#272727] font-extrabold w-[650px] text-5xl text-pretty">
          Давайте зробимо прекрасні квіти частиною нашого життя
        </h1>
        <p className="text-lg text-[#272727]/60 w-[600px]">
          Ми створюємо букети, що дарують емоції, прикрашають важливі моменти та
          наповнюють кожен день ароматом і красою природи
        </p>
      </div>

      <Image
        src="/hero-section.svg"
        alt="hero section"
        width={635}
        height={600}
        className="object-contain h-[500px]"
      />
    </MaxWidthWrapper>
  );
}
