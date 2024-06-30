import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ token: null, role: null });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            setAuth({ token: token, role: role });
        }
    }, []);

    const setToken = (token) => {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setAuth({ token: token, role: role });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuth({ token: null, role: null });
    };

    return (
        <AuthContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
