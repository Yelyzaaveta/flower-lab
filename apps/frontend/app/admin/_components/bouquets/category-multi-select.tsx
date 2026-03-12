"use client";

import { useEffect, useRef, useState } from "react";
import { getCategories } from "@/app/api/categories";
import { Category } from "@/lib/types/category";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

interface CategoryMultiSelectProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

export default function CategoryMultiSelect({
  selected,
  onChange,
}: CategoryMultiSelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (name: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((c) => c !== name));
    }
  };

  const label =
    selected.length === 0
      ? "Оберіть категорії"
      : selected.join(", ");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white hover:border-slate-400 transition"
      >
        <span className="truncate text-left">{label}</span>
        <ChevronDown size={16} className="ml-2 shrink-0 text-slate-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-md max-h-52 overflow-y-auto">
          {categories.length === 0 && (
            <p className="px-3 py-2 text-sm text-slate-400">
              Немає категорій
            </p>
          )}
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 capitalize"
            >
              <Checkbox
                id={`ms-cat-${cat.id}`}
                checked={selected.includes(cat.name)}
                onCheckedChange={(checked) => toggle(cat.name, Boolean(checked))}
              />
              <Label htmlFor={`ms-cat-${cat.id}`} className="cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
