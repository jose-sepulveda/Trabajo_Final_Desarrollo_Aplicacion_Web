// GestionCoffePage.js

import React, { useState, useContext } from "react";
import { createCoffee } from "../services/api"; // Importa la función de creación de café
import { AuthContext } from "../auth/AuthContext"; // Importa el contexto de autenticación
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token JWT

function GestionCoffePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image64, setImage64] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { auth } = useContext(AuthContext);

    let decodedToken = null;

    if (auth.token) {
        decodedToken = jwtDecode(auth.token);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage64(file);
    };

    const crearCoffee = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        if (decodedToken.role === "ADMIN") {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("image64", image64);

            try {
                const resp = await createCoffee(auth.token, formData); // Llama a la función para crear café

                if (resp) {
                    alert("Café creado exitosamente");
                    // Aquí puedes redirigir o hacer otra acción después de crear el café
                } else {
                    setErrorMessage("Error al registrar café");
                }
            } catch (error) {
                console.error("Error al crear café:", error);
                setErrorMessage("Error al registrar café");
            }
        } else {
            setErrorMessage("No tienes permisos para crear café.");
        }
    };

    return (
        <div className="crear-coffee-container">
            <div className="crear-coffee">
                <h3>Añadir café</h3>
                <form onSubmit={crearCoffee}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del café" />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio" />
                    <input type="file" onChange={handleImageChange} required />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">Agregar café</button>
                </form>
            </div>
        </div>
    );
}

export { GestionCoffePage };