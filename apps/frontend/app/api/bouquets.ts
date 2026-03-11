import { API_URL } from "@/lib/constants/base"
import { Bouquet, BouquetWithRelated } from "@/lib/types/bouquet"

export const getBouquets = async (): Promise<Bouquet[]> => {
    const res = await fetch(`${API_URL}/bouquets`)
    if (!res.ok) {
        throw new Error("Failed to bouquets ")
    }
    const data = await res.json()
    return data.data
}


export const getBouquetById = async (id: number): Promise<BouquetWithRelated> => {
    const res = await fetch(`${API_URL}/bouquets/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch bouquet");
    }

    const data = await res.json();
    return data;
};
