export interface AdminData {
    id: number;
    email: string;
    role: string;
    token: string;
}

export interface LoginResponse {
    data: AdminData;
}

export interface ErrorResponse {
    error: {
        code: string;
        message: string;
    };
}