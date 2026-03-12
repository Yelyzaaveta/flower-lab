import { API_URL } from "@/lib/constants/base"
import { Bouquet, BouquetsResponse, BouquetWithRelated, CreateBouquetData, GetBouquetsOptions, UpdateBouquetData } from "@/lib/types/bouquet"

export const getBouquets = async (options: GetBouquetsOptions = {}) => {
    const { limit, lastId, priceRange, category } = options;

    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (lastId) params.append("lastId", lastId.toString());
    if (priceRange?.from !== undefined) params.append("priceFrom", priceRange.from.toString());
    if (priceRange?.to !== undefined) params.append("priceTo", priceRange.to.toString());
    if (category) {
        if (Array.isArray(category)) {
            category.forEach((c) => params.append("category", c));
        } else {
            params.append("category", category);
        }
    }

    const res = await fetch(`${API_URL}/bouquets?${params.toString()}`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || "Failed to fetch bouquets");
    }

    return res.json();
};


export const getBouquetById = async (id: number): Promise<BouquetWithRelated> => {
    const res = await fetch(`${API_URL}/bouquets/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch bouquet");
    }

    const data = await res.json();
    return data;
};

export const deleteBouquet = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_URL}/bouquets/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete bouquet");
    }

    return res.json();
};


export const updateBouquet = async (id: number, data: UpdateBouquetData) => {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.longDescription) formData.append("longDescription", data.longDescription);
    if (data.shortDescription) formData.append("shortDescription", data.shortDescription);
    if (data.flowersAmount !== undefined) formData.append("flowersAmount", data.flowersAmount.toString())
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.category) formData.append("category", data.category);
    if (data.imgUrl instanceof File) {
        formData.append("img", data.imgUrl);
    }

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/bouquets/${id}`, {
        method: "PUT",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || "Failed to update bouquet");
    }

    return res.json();
};

export const createBouquet = async (data: CreateBouquetData): Promise<{ data: Bouquet }> => {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.shortDescription) formData.append("shortDescription", data.shortDescription);
    if (data.longDescription) formData.append("longDescription", data.longDescription);
    if (data.flowersAmount !== undefined) formData.append("flowersAmount", data.flowersAmount.toString());
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.category) formData.append("category", data.category);
    if (data.imgUrl instanceof File) {
        formData.append("img", data.imgUrl);
    }

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/bouquets`, {
        method: "POST",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || "Failed to create bouquet");
    }

    const json = await res.json();

    return json.data;
};