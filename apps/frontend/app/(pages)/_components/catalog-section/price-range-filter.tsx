"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceRangeFilterProps {
  value: {
    from?: number;
    to?: number;
  };
  onChange: (range: { from?: number; to?: number }) => void;
}

export default function PriceRangeFilter({
  value,
  onChange,
}: PriceRangeFilterProps) {
  return (
    <div className="flex gap-4 p-3 rounded-xl bg-white">
      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Ціна від</Label>
        <Input
          type="number"
          placeholder="0"
          value={value.from ?? ""}
          className="w-24"
          onChange={(e) =>
            onChange({
              ...value,
              from: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Ціна до</Label>
        <Input
          type="number"
          placeholder="1000"
          value={value.to ?? ""}
          className="w-24"
          onChange={(e) =>
            onChange({
              ...value,
              to: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>
    </div>
  );
}
