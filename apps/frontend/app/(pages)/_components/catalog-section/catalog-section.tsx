"use client";
import { useState, useEffect } from "react";
import CategoriesFilter from "@/app/(pages)/_components/catalog-section/categories-filter";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import { Bouquet } from "@/lib/types/bouquet";
import BouqutesCardsSection from "./bouquetes-cards-section";
import { getBouquets } from "@/app/api/bouquets";
import PaginationBar from "./pagination-bar";
import PriceFilterSelect from "./price-filter-select";

export default function CatalogSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 9;

  useEffect(() => {
    async function fetchBouquets() {
      const data = await getBouquets();
      setBouquets(data);
    }
    fetchBouquets();
  }, []);

  let filteredBouquets = selectedCategories.length
    ? bouquets.filter((b) => selectedCategories.includes(b.category))
    : bouquets;

  if (sortValue === "price-asc") {
    filteredBouquets = filteredBouquets
      .slice()
      .sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortValue === "price-desc") {
    filteredBouquets = filteredBouquets
      .slice()
      .sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortValue === "popular") {
    filteredBouquets = filteredBouquets
      .slice()
      .sort((a, b) => Number(b.buyAmount) - Number(a.buyAmount));
  }

  const totalPages = Math.ceil(filteredBouquets.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const paginatedBouquets = filteredBouquets.slice(start, start + PAGE_SIZE);

  return (
    <MaxWidthWrapper className="flex justify-between">
      <div className="flex p-10 bg-white rounded-xl w-[182px] h-fit">
        <CategoriesFilter
          selectedCategories={selectedCategories}
          onChange={(categories) => {
            setSelectedCategories(categories);
            setPage(1);
          }}
        />
      </div>

      <div>
        <div className="mt-6">
          <PriceFilterSelect
            value={sortValue}
            onChange={(v) => setSortValue(v)}
          />
        </div>

        <BouqutesCardsSection bouquets={paginatedBouquets} />
        {totalPages > 1 && (
          <PaginationBar
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
