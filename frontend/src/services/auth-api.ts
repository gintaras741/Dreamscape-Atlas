export const API_BASE_URL = "http://localhost:5014/api";

interface AuthResponse {
    userId: string;
    email: string;
    firstname?: string;
    lastname?: string;
}

export const authApi = {
    register: async (data: any): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/Auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }
        return response.json();
    },

    login: async (data: any): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failes");
        }
        return response.json();
    },
};
