import { API_URL } from "@/lib/constants/base"
import { Category, CreateCategoryData, UpdateCategoryData, UpdateCategoryResponse } from "@/lib/types/category"

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

export const deleteCategory = async (id: number): Promise<{ message: string }> => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(errorData?.message || "Failed to delete category");
        }

        return res.json();
    } catch (err: any) {
        console.error("Error deleting category:", err.message);
        throw err;
    }
};

export const updateCategory = async (
    id: number,
    data: UpdateCategoryData
): Promise<UpdateCategoryResponse> => {

    const formData = new FormData()

    if (data.name) formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)

    if (data.previewImgUrl instanceof File) {
        formData.append("previewImgUrl", data.previewImgUrl);
    }

    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }))
        throw new Error(error.message || "Failed to update category")
    }

    return res.json()
}

export const createCategory = async (
    data: CreateCategoryData
): Promise<Category> => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.description) {
        formData.append("description", data.description);
    }

    if (data.previewImgUrl instanceof File) {
        formData.append("previewImgUrl", data.previewImgUrl);
    }

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Failed to create category");
    }

    const json = await res.json();

    return json.data;
};