"use server";

import { API_BASE_URL, authApi } from "@/services/auth-api";

export const serverLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await authApi.login({ email, password });

        return { success: true, user: response };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const serverRegister = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    try {
        const response = await authApi.register({
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
        });

        return { success: true, user: response };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Registration failed",
        };
    }
};

export const serverLogout = async () => {
    await fetch(`${API_BASE_URL}/Auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    return { success: true, message: "Logged out successfully" };
};
