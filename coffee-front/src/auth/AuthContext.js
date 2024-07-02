import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ token: null, role: null, username: null });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const { role, sub: username } = decodedToken; // Asumiendo que el campo 'sub' es el username en tu token
            setAuth({ token, role, username });
        }
    }, []);

    const setToken = (token) => {
        const decodedToken = jwtDecode(token);
        const { role, sub: username } = decodedToken;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        setAuth({ token, role, username });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        setAuth({ token: null, role: null, username: null });
    };

    return (
        <AuthContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
