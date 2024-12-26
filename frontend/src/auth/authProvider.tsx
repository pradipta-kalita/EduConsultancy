import React, { useCallback, useEffect, useState } from "react";
import { AuthContext, User } from "@/auth/authContext.tsx";
import axios from "@/utils/axiosInstance.ts";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Function to check if the token is expired
    const isTokenExpired = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return payload.exp < currentTime; // Compare expiration time
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // If token decoding fails, treat it as expired
        }
    };

    // Memoize refreshToken to avoid unnecessary re-renders
    const refreshToken = useCallback(async () => {
        try {
            const response = await axios.get('/auth/refresh', { withCredentials: true });
            login({
                username: response.data.username,
                role: response.data.role,
                accessToken: response.data.accessToken,
            });
        } catch (error) {
            console.error("Error refreshing token:", error);
            await logout(); // Logout if refresh fails
        }
    }, []);

    // Effect to check the token and refresh if expired
    useEffect(() => {
        (async function(){
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (isTokenExpired(parsedUser.accessToken)) {
                    // Token is expired, try refreshing it
                    await refreshToken();
                } else {
                    setUser(parsedUser); // Token is still valid
                }
            }
        })();
    }, [refreshToken]); // This will only run when refreshToken is updated

    // Login function
    const login = (data: User) => {
        setUser(data); // Store the user data (including access token)
        localStorage.setItem("user", JSON.stringify(data)); // Store user in localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post('/auth/logout', null, { withCredentials: true });
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setUser(null); // Clear user data
            localStorage.removeItem("user");
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
