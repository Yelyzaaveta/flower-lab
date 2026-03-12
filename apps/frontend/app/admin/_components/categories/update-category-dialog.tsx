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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { updateCategory } from "@/app/api/categories";
import { Category, UpdateCategoryData } from "@/lib/types/category";
import { PenSquare } from "lucide-react";

interface UpdateCategoryDialogProps {
  category: Category;
  onUpdate: (updatedCategory: UpdateCategoryData) => void;
}

export default function UpdateCategoryDialog({
  category,
  onUpdate,
}: UpdateCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(category.previewImgUrl || "");
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
    if (!name.trim() || !description.trim()) {
      setError("Назва та опис не можуть бути порожніми");
      return;
    }
    try {
      const data: UpdateCategoryData = {
        name,
        description,
        previewImgUrl: previewFile ?? previewUrl,
      };

      await updateCategory(category.id, data);

      onUpdate({
        ...category,
        name,
        description,
        previewImgUrl: previewUrl,
        updatingDate: new Date().toISOString(),
      });

      setOpen(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Помилка при оновленні категорії");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-lg bg-[#E55473]/10 text-[#E55473] hover:bg-[#E55473]/20 hover:text-[#d94366] transition focus:outline-none focus:ring-2 focus:ring-[#E55473]/40">
          <PenSquare width={22} />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-white p-10">
        <DialogHeader>
          <DialogTitle>Редагувати категорію</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-5">
          <div className="flex flex-col space-y-2">
            <Label>Назва</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[500px]"
              placeholder="Введіть назву"
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
                htmlFor={`file-input-${category.id}`}
                className="flex items-center justify-center h-60 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer text-slate-400 hover:border-[#E55473] hover:text-[#E55473] transition"
              >
                Оберіть файл
                <Input
                  id={`file-input-${category.id}`}
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
