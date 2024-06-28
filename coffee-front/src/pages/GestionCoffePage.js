import React, { useState } from "react";
import { createCoffee } from "../services/api"; 
import { AuthContext } from "../auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../Styles/gestionCoffee.css";


function GestionCoffePage(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image64, setImage64] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { auth } = React.useContext(AuthContext);
    let decodedToken = null;

    if (auth.token) {
        decodedToken = jwtDecode(auth.token);
    }

    const imagen = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () =>{
            setImage64(reader.result.split(",")[1]);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const crearCoffee = async () => {
        if (!decodedToken || decodedToken.role !== "ADMIN") {
            setErrorMessage("Solo ADMIN puede crear un coffee");
            return;
        }
    
        const newCoffee = {
            name,
            description,
            price,
            image64
        };
    
        try {
            const resp = await createCoffee(newCoffee);
    
            if (resp.ok) {
                alert("Coffee creado exitosamente.");
                // Limpiar los campos después de la creación exitosa si es necesario
                setName("");
                setDescription("");
                setPrice("");
                setImage64("");
            } else {
                // Manejar errores específicos según el código de estado HTTP
                if (resp.status === 403) {
                    setErrorMessage("Acceso prohibido. No tienes permiso para crear un café.");
                } else {
                    setErrorMessage("Error al crear el café.");
                }
                console.log(resp); // Puedes console.log(resp) para más detalles de depuración
            }
        } catch (error) {
            setErrorMessage("Error al crear el café.");
            console.error("Error:", error);
        }
    };

return (
    <div className="crear-coffee-container">
        <div className="crear-coffee">
            <h3>Añadir coffe</h3>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre de coffee" />
            <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
            <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Precio" />
            <input type="file" onChange={imagen} required />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={crearCoffee}>Agregar coffee</button>
        </div>
    </div>
);

}


export {GestionCoffePage};