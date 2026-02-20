import { create } from "zustand";
import type { SessionUser } from "./types";
import { mockAdminUser, mockLabUser } from "./mock-data";

interface AuthState {
    user: SessionUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    switchRole: (role: "ADMIN" | "LAB_CLIENT") => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: async (email: string, _password: string) => {
        // Mock authentication - in production, this calls the API
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (email.includes("admin") || email.includes("dra")) {
            set({ user: mockAdminUser, isAuthenticated: true });
            return true;
        } else {
            set({ user: mockLabUser, isAuthenticated: true });
            return true;
        }
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },

    switchRole: (role) => {
        if (role === "ADMIN") {
            set({ user: mockAdminUser });
        } else {
            set({ user: mockLabUser });
        }
    },
}));
