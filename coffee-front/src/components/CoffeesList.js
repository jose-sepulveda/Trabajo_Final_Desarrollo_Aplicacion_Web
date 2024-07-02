import React, { useEffect, useState, useContext } from 'react';
import { getCoffees } from '../services/api';
import { AuthContext } from '../auth/AuthContext';
import Testimonio from '../components/testimonio'; // Importa el componente Testimonio
import "../Styles/coffePage.css";

function CoffeesList() {
    const { auth } = useContext(AuthContext);
    const { token } = auth;
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoffees = async () => {
            try {
                const coffeesData = await getCoffees(token);
                setCoffees(coffeesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoffees();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="coffees-container">
            {coffees.map(coffee => (
                <div key={coffee.idCoffee} className="cafe-card">
                    <img src={`data:image/jpeg;base64,${coffee.image64}`} alt={coffee.name} />
                    <h4>{coffee.name}</h4>
                    <p>{coffee.description}</p>
                    <p>{coffee.price} $</p>
                    {/* Mostrar el componente Testimonio solo para CUSTOMER */}
                    {auth.role === 'CUSTOMER' && (
                        <Testimonio idCoffee={coffee.idCoffee} username={auth.username} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default CoffeesList;
