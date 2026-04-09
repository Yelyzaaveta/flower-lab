"use client";

import { useState } from "react";
import { populateSlugs } from "@/app/api/admin";
import { Button } from "@/components/ui/button";

export default function PopulateSlugsButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    bouquetsUpdated: number;
    categoriesUpdated: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePopulate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await populateSlugs();
      setResult({
        bouquetsUpdated: response.bouquetsUpdated,
        categoriesUpdated: response.categoriesUpdated,
      });
    } catch (err: any) {
      setError(err.message || "Failed to populate slugs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Заповнити slug-и
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Заповнює slug для букетів та категорій, у яких він відсутній
      </p>

      <Button
        onClick={handlePopulate}
        disabled={loading}
        className="bg-[#E55473] hover:bg-[#d93d5b] text-white"
      >
        {loading ? "Заповнення..." : "Заповнити slug-и"}
      </Button>

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ Букетів оновлено: {result.bouquetsUpdated}
          </p>
          <p className="text-sm text-green-700">
            ✓ Категорій оновлено: {result.categoriesUpdated}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">✗ Помилка: {error}</p>
        </div>
      )}
    </div>
  );
}
