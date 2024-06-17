//componenente que contiene toda la app y poder usar variables globales para mostrar o no cositas 

import React from "react";

export const AuthContext = React.createContext(); //es un estado mas global 

export function AuthProvider({children}){ 
    const [auth, setAuth] = React.useState({token: null});

    React.useEffect(() => { //evalua si existe un token 
        const token = localStorage.getItem("token");
        if (token){
            setAuth({token:token})
        }
    }, [])
//controla la sesión
    const setToken = async (token) => {
        localStorage.setItem("token", token);
        setAuth({token:token});
    }
//cerrar sesión 
    const logout = () => {
        localStorage.removeItem("token");
        setAuth({token:null})
    }

    return <AuthContext.Provider value={{auth, setToken, logout}}>

        {children}

    </AuthContext.Provider>

}

