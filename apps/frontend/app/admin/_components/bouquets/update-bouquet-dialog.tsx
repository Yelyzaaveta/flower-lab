"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { updateBouquet } from "@/app/api/bouquets";
import { Bouquet, UpdateBouquetData } from "@/lib/types/bouquet";
import { PenSquare } from "lucide-react";
import CategoryMultiSelect from "./category-multi-select";

interface UpdateBouquetDialogProps {
  bouquet: Bouquet;
  onUpdate: (updatedBouquet: UpdateBouquetData) => void;
}

export default function UpdateBouquetDialog({
  bouquet,
  onUpdate,
}: UpdateBouquetDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(bouquet.name);
  const [shortDescription, setShortDescription] = useState(
    bouquet.shortDescription || "",
  );
  const [longDescription, setLongDescription] = useState(
    bouquet.longDescription || "",
  );
  const [flowersAmount, setFlowersAmount] = useState(bouquet.flowersAmount);
  const [price, setPrice] = useState(bouquet.price);
  const [categories, setCategories] = useState<string[]>(
    bouquet.categories ?? [],
  );
  const [previewFile, setPreviewFile] = useState<File | string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(bouquet.imgUrl || "");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !shortDescription.trim() || !longDescription.trim()) {
      setError("Назва, короткий та довгий опис не можуть бути порожніми");
      return;
    }

    try {
      const data: UpdateBouquetData = {
        name,
        shortDescription,
        longDescription,
        flowersAmount,
        price,
        categories,
        imgUrl: previewFile ?? previewUrl,
      };

      await updateBouquet(bouquet.id, data);

      onUpdate({
        ...bouquet,
        ...data,
        imgUrl: previewUrl,
      });

      setOpen(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Помилка при оновленні букета");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-lg bg-[#E55473]/10 text-[#E55473] hover:bg-[#E55473]/20 hover:text-[#d94366] transition focus:outline-none focus:ring-2 focus:ring-[#E55473]/40">
          <PenSquare width={22} />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-white p-10 max-h-[600px] scrollbar-hide w-[1200px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редагувати букет</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-5">
          {/* Назва */}
          <div className="flex flex-col space-y-2">
            <Label>Назва</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть назву"
            />
          </div>

          <div className="flex space-x-6 w-full">
            <div className="flex-1 flex flex-col space-y-2">
              <Label>Короткий опис</Label>
              <Textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Введіть короткий опис"
                className="h-[120px]"
              />
            </div>

            <div className="flex-1 flex flex-col space-y-2">
              <Label>Довгий опис</Label>
              <Textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Введіть довгий опис"
                className="h-[120px]"
              />
            </div>
          </div>

          <div className="flex space-x-6 w-full">
            <div className="flex flex-col space-y-2">
              <Label>Кількість квітів у букеті</Label>
              <Input
                type="number"
                value={flowersAmount}
                onChange={(e) => setFlowersAmount(Number(e.target.value) || 0)}
                placeholder="Введіть кількість"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Ціна</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                placeholder="Введіть ціну"
              />
            </div>

            <div className="flex flex-col space-y-2 min-w-[200px]">
              <Label>Категорії</Label>
              <CategoryMultiSelect
                selected={categories}
                onChange={setCategories}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Картинка</Label>
            {previewUrl ? (
              <div className="w-[250px] h-[200px] mb-2 relative">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-[#E55473] hover:bg-[#d94366] text-white rounded-lg px-3 py-1 text-sm font-medium cursor-pointer shadow-sm transition"
                >
                  Видалити
                </Button>
              </div>
            ) : (
              <label
                htmlFor={`file-input-${bouquet.id}`}
                className="flex items-center justify-center h-60 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer text-slate-400 hover:border-[#E55473] hover:text-[#E55473] transition"
              >
                Оберіть файл
                <Input
                  id={`file-input-${bouquet.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-[#E55473] px-10 py-4 hover:bg-[#d94366] text-white cursor-pointer"
          >
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
