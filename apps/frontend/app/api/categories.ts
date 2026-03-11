import { API_URL } from "@/lib/constants/base"
import { Category } from "@/lib/types/category"

export const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/categories`)
    if (!res.ok) {
        throw new Error("Failed to fetch categories")
    }
    const data = await res.json()
    return data.data
}

export const getCategoryById = async (id: number): Promise<Category> => {
    const res = await fetch(`${API_URL}/categories/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch category");
    }

    const data = await res.json();
    return data.data;
};



