"use client";
import { useState, useEffect } from "react";
import { deleteBouquet, getBouquets } from "@/app/api/bouquets";
import { Bouquet } from "@/lib/types/bouquet";
import BouquetCard from "./bouquet-card";
import PaginationBar from "@/components/pagination-bar";

import CreateBouquetDialog from "./create-bouquet-dialog";

export default function BouquetsSection() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [lastId, setLastId] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchBouquets() {
      try {
        const res = await getBouquets({
          limit,
          lastId,
        });

        setBouquets(res.data);
        setTotalPages(Math.ceil(res.meta.nextLastId ? page + 1 : page));
      } catch (err) {
        console.error(err);
      }
    }
    fetchBouquets();
  }, [page, lastId]);

  const handleCreateBouquet = (newBouquet: Bouquet) => {
    setBouquets([newBouquet, ...bouquets]);
  };

  const handleSetPage = (newPage: number) => {
    if (newPage > page) {
      setLastId(bouquets[bouquets.length - 1]?.id || null);
    } else if (newPage < page) {
      setLastId(null);
    }
    setPage(newPage);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBouquet(id);
      setBouquets((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col">
      <CreateBouquetDialog onCreate={handleCreateBouquet} />
      <div className="flex flex-col space-y-10">
        {bouquets.map((bouquet) => (
          <BouquetCard
            key={bouquet.id}
            bouquet={bouquet}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <PaginationBar
        page={page}
        totalPages={totalPages}
        setPage={handleSetPage}
      />
    </div>
  );
}
