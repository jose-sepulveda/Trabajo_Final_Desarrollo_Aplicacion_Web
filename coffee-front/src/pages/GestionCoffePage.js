import React, { useState, useContext, useEffect} from "react";
import { createCoffee, getCoffees, updateCoffee, deleteCoffee, getTestimonioCoffee} from "../services/api"; 
import { AuthContext } from "../auth/AuthContext";
import { jwtDecode } from "jwt-decode"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/gestionCoffee.css";

function GestionCoffePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image64, setImage64] = useState(null);
    const [coffees, setCoffees] = useState([]); //lista cafe
    const [editPrice, setEditPrice] = useState("");
    const [editCoffeeId, setEditCoffeeId] = useState(null); //editar por id 
    const [testimonials, setTestimonials] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const { auth } = useContext(AuthContext);

    let decodedToken = null;

    if (auth.token) {
        decodedToken = jwtDecode(auth.token);
    }

    useEffect(() => {
        async function ObtCoffees() {
            try {
                const coffeeList = await getCoffees(auth.token);
                setCoffees(coffeeList);

                 // Obtener testimonios para cada café
                 const testimonialsData = {};
                 for (const coffee of coffeeList) {
                     const coffeeTestimonials = await getTestimonioCoffee(coffee.idCoffee);
                     testimonialsData[coffee.idCoffee] = coffeeTestimonials;
                 }
                 setTestimonials(testimonialsData);

            } catch (error) {
                console.error("Error al obtener la lista de cafés:", error);
            }
        }

        ObtCoffees();
    }, [auth.token]);

    const cambioImg64 = (e) => {
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
                const resp = await createCoffee(auth.token, formData);
    
                if (resp.ok) {
                    toast.success("Café creado exitosamente", {
                        position: "top-center",
                        autoClose: 2000
                    });
    
                    const coffeeList = await getCoffees(auth.token);
                    setCoffees(coffeeList);
                    setName("");
                    setDescription("");
                    setPrice("");
                    setImage64(null);
                } else {
                    setErrorMessage("Error al registrar café");
                }
            } catch (error) {
                console.error("Error al crear café:", error);
                setErrorMessage("Error al registrar café");
            }
        } else {
            setErrorMessage("No tienes permisos para crear café");
        }
    };

    const editarPrecioo = async (coffeeId) => {
        try {
            await updateCoffee(auth.token, coffeeId, editPrice);
            const updatedCoffees = coffees.map((coffee) =>
                coffee.idCoffee === coffeeId ? { ...coffee, price: editPrice } : coffee
            );
            setCoffees(updatedCoffees);
            setEditCoffeeId(null);

            toast.success(`Se actualizó el precio de café ${coffeeId}`, {
                position: "top-center", 
                autoClose: 2000
            });

        } catch (error) {
            console.error(`Error al actualizar el precio ${coffeeId}:`, error);
            if (error.response && error.response.status === 404) {
                setErrorMessage(`El café con ID ${coffeeId} no fue encontrado.`);
            } else {
                setErrorMessage("Error al actualizar el precio del café");
            }
        }
    };
   
    const eliminarCafe = async (coffeeId) => {
        try {
            await deleteCoffee(auth.token, coffeeId);
            const filtrado = coffees.filter(coffee => coffee.idCoffee !== coffeeId);
            setCoffees(filtrado);

            toast.success("Café eliminado exitosamente", {
                position: "top-center", 
                autoClose: 2000
            });

        } catch (error) {
            console.error(`Error al eliminar café con ID ${coffeeId}:`, error);
            setErrorMessage("Error al eliminar café");
        }
    };


    return (
        <div className="crear-coffee-container">
            <div className="crear-coffee">
                <h3>Nuevo coffee</h3>
                <form onSubmit={crearCoffee}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del café" />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio" />
                    <input type="file" onChange={cambioImg64} required />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">Agregar café</button>
                </form>
            </div>
            <div className="lista-coffees">
                <h3>Lista de cafés</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Testimonios</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coffees.map((coffee) => (
                            <tr key={coffee.idCoffee}>
                                <td>{coffee.idCoffee}</td>
                                <td>{coffee.name}</td>
                                <td>{coffee.description}</td>
                                <td>
                                    {editCoffeeId === coffee.idCoffee ? (
                                        <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="Nuevo Precio" />
                                    ) : (
                                        coffee.price
                                    )}
                                </td>
                                <td>
                                    {coffee.image64 && (
                                        <img src={`data:image/jpeg;base64,${coffee.image64}`} alt={coffee.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                    )}
                                </td>
                                <td>
                                    {testimonials[coffee.idCoffee] && testimonials[coffee.idCoffee].map((testimonial, index) => (
                                        <div key={index}>
                                            <strong>{testimonial.username}:</strong> {testimonial.testimonial}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {editCoffeeId === coffee.idCoffee ? (
                                        <button onClick={() => editarPrecioo(coffee.idCoffee)}>Guardar</button>
                                    ) : (
                                        <button onClick={() => setEditCoffeeId(coffee.idCoffee)}>Editar</button>
                                    )}
                                    <button onClick={() => eliminarCafe(coffee.idCoffee)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ToastContainer /> 
            </div>
        </div>
    );
}

export { GestionCoffePage };
