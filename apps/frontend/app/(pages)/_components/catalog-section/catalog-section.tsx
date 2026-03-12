"use client";
import { useState, useEffect } from "react";
import CategoriesFilter from "@/app/(pages)/_components/catalog-section/categories-filter";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import { Bouquet } from "@/lib/types/bouquet";
import BouqutesCardsSection from "./bouquetes-cards-section";
import { getBouquets } from "@/app/api/bouquets";
import PaginationBar from "@/components/pagination-bar";
import PriceRangeFilter from "./price-range-filter";
import { useDebounce } from "@/hooks/use-debounce";

export default function CatalogSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [lastId, setLastId] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState<{
    from?: number;
    to?: number;
  }>({});
  const debouncedPriceRange = useDebounce(priceRange, 400);

  useEffect(() => {
    async function fetchBouquets() {
      try {
        const res = await getBouquets({
          limit,
          lastId,
          category: selectedCategories,
          priceRange: debouncedPriceRange,
        });

        setBouquets(res.data);
        setTotalPages(Math.ceil(res.meta.nextLastId ? page + 1 : page));
      } catch (err) {
        console.error(err);
      }
    }
    fetchBouquets();
  }, [page, lastId, selectedCategories, priceRange]);

  const handleSetPage = (newPage: number) => {
    if (newPage > page) {
      setLastId(bouquets[bouquets.length - 1]?.id || null);
    } else if (newPage < page) {
      setLastId(null);
    }
    setPage(newPage);
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col">
        <div className="self-end mb-10">
          <PriceRangeFilter
            value={priceRange}
            onChange={(range) => {
              setPriceRange(range);
              setPage(1);
              setLastId(null);
            }}
          />
        </div>

        <div className="flex justify-between w-full">
          <div className="flex p-10 bg-white rounded-xl w-[182px] h-fit">
            <CategoriesFilter
              selectedCategories={selectedCategories}
              onChange={(categories) => {
                setSelectedCategories(categories);
                setPage(1);
              }}
            />
          </div>
          <BouqutesCardsSection bouquets={bouquets} />
        </div>

        {totalPages > 1 && (
          <PaginationBar
            page={page}
            totalPages={totalPages}
            setPage={handleSetPage}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
