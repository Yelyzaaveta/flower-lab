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
import { createCategory } from "@/app/api/categories";
import { Category, CreateCategoryData } from "@/lib/types/category";
import { Plus } from "lucide-react";

interface CreateCategoryDialogProps {
  onCreate: (newCategory: Category) => void;
}

export default function CreateCategoryDialog({
  onCreate,
}: CreateCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreviewFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async () => {

    if (!name.trim() || !description.trim()) {
      setError("Назва та опис не можуть бути порожніми");
      return;
    }

    try {
      const data: CreateCategoryData = {
        name,
        description,
        previewImgUrl: previewFile || undefined,
      };

      const newCategory = await createCategory(data);

      onCreate(newCategory);

      setOpen(false);
      setName("");
      setDescription("");
      setPreviewFile(null);
      setPreviewUrl("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Помилка при створенні категорії");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center self-end cursor-pointer mr-10 gap-2 px-5 py-2.5 mb-10 bg-[#E55473] text-white font-semibold rounded-lg shadow-sm hover:bg-[#d94366] hover:shadow-md transition">
          <Plus size={20} />
          Додати нову категорію
        </div>
      </DialogTrigger>

      <DialogContent className="bg-white p-10 w-[1200px]">
        <DialogHeader>
          <DialogTitle>Створити категорію</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-5">
          <div className="flex flex-col space-y-2">
            <Label>Назва</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть назву"
              className="w-[500px]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Опис</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-[80px]"
              placeholder="Введіть опис"
            />
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
                  className="absolute -top-3 -right-5 bg-[#E55473] hover:bg-[#d94366] text-white rounded-lg px-3 py-1 text-sm font-medium cursor-pointer shadow-sm transition"
                >
                  Видалити
                </Button>
              </div>
            ) : (
              <label
                htmlFor="file-input-create-category"
                className="flex items-center justify-center h-60 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer text-slate-400 hover:border-[#E55473] hover:text-[#E55473] transition"
              >
                Оберіть файл
                <Input
                  id="file-input-create-category"
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
            className="bg-[#4CAF50] px-10 py-4 hover:bg-[#388E3C] text-white cursor-pointer"
          >
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
