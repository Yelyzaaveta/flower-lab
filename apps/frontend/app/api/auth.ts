import { LoginResponse, ErrorResponse } from "@/lib/types/auth";
import { API_URL } from "@/lib/constants/base";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        const err: ErrorResponse = data;
        throw new Error(err.error.message);
    }

    localStorage.setItem("token", data.data.token);

    return data;
};

export const logout = async (): Promise<void> => {
    localStorage.removeItem("token");

    await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};