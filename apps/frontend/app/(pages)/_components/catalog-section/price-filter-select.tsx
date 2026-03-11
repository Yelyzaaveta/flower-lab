"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PriceFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PriceFilterSelect({
  value,
  onChange,
}: PriceFilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Сортувати за" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Ціна: від меншої до більшої</SelectItem>
        <SelectItem value="price-desc">Ціна: від більшої до меншої</SelectItem>
        <SelectItem value="popular">За популярністю</SelectItem>
      </SelectContent>
    </Select>
  );
}
