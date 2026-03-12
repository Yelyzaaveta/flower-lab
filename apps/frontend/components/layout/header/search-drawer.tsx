"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { useEscapeKey } from "@/hooks/use-escape-key";
import type { Bouquet } from "@/lib/types/bouquet";
import { searchBouquets } from "@/app/api/search";
import Link from "next/link";
import { Search, X } from "lucide-react";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Bouquet[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 400);
  const containerRef = useRef<HTMLDivElement>(null);

  useEscapeKey(onClose);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      const data = await searchBouquets(debouncedQuery);
      setResults(data);
    };

    fetchResults();
  }, [debouncedQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur">
      <div ref={containerRef} className="max-w-3xl mx-auto pt-20 px-4">
        <div className="flex items-center gap-3 border-b pb-2">
          <Search className="w-5 h-5 text-gray-400" />

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук букетів..."
            className="w-full outline-none text-lg"
          />

          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {debouncedQuery && results.length === 0 && (
          <div className="mt-4 text-gray-400">Нічого не знайдено</div>
        )}

        {results.length > 0 && (
          <div className="mt-4 bg-white shadow-lg rounded-lg">
            {results.slice(0, 6).map((bouquet) => (
              <div
                key={bouquet.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <Link href={`/bouquets/${bouquet.id}`}>{bouquet.name}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
