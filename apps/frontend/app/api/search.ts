import { API_URL } from "@/lib/constants/base";
import { Bouquet } from "@/lib/types/bouquet";

export const searchBouquets = async (
    q: string,
): Promise<Bouquet[]> => {
    if (!q || q.trim().length < 2) return [];

    const params = new URLSearchParams();
    params.append("q", q.trim());

    const res = await fetch(`${API_URL}/search?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to search bouquets");

    const data = await res.json();
    return data.data;
};