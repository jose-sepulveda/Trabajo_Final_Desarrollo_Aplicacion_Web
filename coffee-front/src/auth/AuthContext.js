// authContext.js
import React from "react";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = React.useState({ token: null, role: null });

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role"); // Agregar recuperación de rol
        if (token) {
            setAuth({ token: token, role: role }); // Incluir el rol en el estado de auth
        }
    }, []);

    const setToken = async (token, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role); // Guardar el rol en localStorage
        setAuth({ token: token, role: role });
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // Eliminar el rol al cerrar sesión
        setAuth({ token: null, role: null });
    }

    return (
        <AuthContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}