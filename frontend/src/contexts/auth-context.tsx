"use client";
import { createContext, use, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
    userId: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    login: (
        userId: string,
        email: string,
        firstName: string | null,
        lastName: string | null
    ) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("email");
        const storedFirstName = localStorage.getItem("firstName");
        const storedLastName = localStorage.getItem("lastName");

        if (storedUserId && storedEmail) {
            setUserId(storedUserId);
            setEmail(storedEmail);
            setFirstName(storedFirstName);
            setLastName(storedLastName);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (
        newUserId: string,
        newEmail: string,
        newFirstName: string | null,
        newLastName: string | null
    ) => {
        localStorage.setItem("userId", newUserId);
        localStorage.setItem("email", newEmail);
        if (newFirstName) {
            localStorage.setItem("firstName", newFirstName);
        }
        if (newLastName) {
            localStorage.setItem("lastName", newLastName);
        }
        setIsAuthenticated(true);
        setUserId(newUserId);
        setEmail(newEmail);
        setFirstName(newFirstName);
        setLastName(newLastName);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");

        setUserId(null);
        setEmail(null);
        setFirstName(null);
        setLastName(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                userId,
                email,
                firstName,
                lastName,
                login,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
