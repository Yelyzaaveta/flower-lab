import { API_URL } from "@/lib/constants/base"

export const populateSlugs = async (): Promise<{
  message: string;
  bouquetsUpdated: number;
  categoriesUpdated: number;
}> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_URL}/admin/populate-slugs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || "Failed to populate slugs");
    }

    return res.json();
};
