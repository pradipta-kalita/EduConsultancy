import { createContext, useContext } from "react";

export type User = {
    username: string;
    role: string;
    accessToken: string;
};

export type AuthContextType = {
    user: User | null;
    login: (data: User) => void;
    logout: () => void;
    refreshToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
