export type LoginCredentials = {
    email: string;
    password: string;
};

export type AuthResponse = {
    success: boolean;
    message?: string;
};
