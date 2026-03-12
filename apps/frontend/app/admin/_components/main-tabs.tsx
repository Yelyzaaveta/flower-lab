"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BouquetsSection from "./bouquets/bouquets-section";
import CategoriesSection from "./categories/categories-section";

export default function MainTabs() {
  return (
    <Tabs defaultValue="bouquets" className="w-full space-y-6 flex flex-col">
      <TabsList
        className="bg-[#E55473]/10 p-1 rounded-xl flex gap-1 w-fit self-center
    "
      >
        <TabsTrigger
          value="bouquets"
          className="px-6 py-2 cursor-pointer rounded-lg text-sm font-semibold text-[#272727] transition data-[state=active]:bg-[#E55473] data-[state=active]:text-white data-[state=active]:shadow-md"
        >
          Букети
        </TabsTrigger>

        <TabsTrigger
          value="categories"
          className="px-6 py-2 cursor-pointer rounded-lg text-sm font-semibold text-[#272727] transition data-[state=active]:bg-[#E55473] data-[state=active]:text-white data-[state=active]:shadow-md"
        >
          Категорії
        </TabsTrigger>
      </TabsList>

      <TabsContent value="bouquets" className="pt-4 animate-in fade-in-50">
        <BouquetsSection />
      </TabsContent>

      <TabsContent value="categories" className="pt-4 animate-in fade-in-50">
        <CategoriesSection />
      </TabsContent>
    </Tabs>
  );
}
