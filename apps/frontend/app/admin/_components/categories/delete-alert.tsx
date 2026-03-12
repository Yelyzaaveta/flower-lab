import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Category } from "@/lib/types/category";
import { Trash } from "lucide-react";

interface DeleteAlertProps {
  handleDelete?: (id: number) => void;
  category: Category;
}

export default function DeleteAlert({
  handleDelete,
  category,
}: DeleteAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-300">
        <Trash size={22} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white bordered-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Видалити категорію?</AlertDialogTitle>
          <AlertDialogDescription>
            Ви впевнені, що хочете видалити "{category.name}"? Цю дію неможливо
            буде скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Скасувати
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => handleDelete && handleDelete(category.id)}
          >
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
