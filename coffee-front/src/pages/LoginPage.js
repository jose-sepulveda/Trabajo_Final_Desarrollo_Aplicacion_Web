import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/loginPage.css";

function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setToken } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const login = async () => {
        try {
            const resp = await loginAccount({ username: username, password: password });
            
            if (resp) {
                await setToken(resp.token);
                navigate("/");
            } else {
                toast.error("Usuario bloqueado. Contacta al administrador.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            toast.error("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
        }
    }

    return (
        <>
            <div className="login-page-container">
                <div className="login">
                    <h3>Iniciar Sesión</h3>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                    <button onClick={login}>Iniciar sesión</button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export { LoginPage };
