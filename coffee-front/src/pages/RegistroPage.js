import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { registerAccount } from "../services/api"; 
import "../Styles/registroPage.css";

function RegistroPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = { 
            username, 
            email, 
            password: hashedPassword, 
            locked: 0, 
            disabled: 0 
        };

        try {
            const resp = await registerAccount(newUser);

            if (resp) {
                alert("Usuario registrado exitosamente");
                navigate("/login");
            } else {
                setErrorMessage("Error al registrar el usuario");
                console.log(resp); 
            }
        } catch (error) {
            setErrorMessage("Error al registrar el usuario");
            console.error("Error:", error);
        }
    };

    return (
        <div className="registro-page-container">
            <div className="registro">
                <h3>Registrarse</h3>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={register}>Registrarse</button>
            </div>
        </div>
    );
}

export { RegistroPage };