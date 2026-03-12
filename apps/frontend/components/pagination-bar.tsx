"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function PaginationBar({
  page,
  totalPages,
  setPage,
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(Math.max(page - 1, 1))} className="cursor-pointer"/>
        </PaginationItem>

        <PaginationItem className="px-4">
          {page} / {totalPages}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(page + 1, totalPages))} className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
