import React, { useState, useEffect } from 'react';
import { getCoffeeByName, getCoffees } from '../services/api';

const FiltroCoffeeComponents = ({ filtrar }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        const ObtCoffees = async () => {
            try {
                const coffeesData = await getCoffees();
                setCoffees(coffeesData);
            } catch (error) {
                setError(error.message);
            }
        };

        ObtCoffees();
    }, []);

    const buscador = async () => {
        try {
            const coffeeData = await getCoffeeByName(searchTerm, coffees);
            filtrar(coffeeData);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre de café"
            />
            <button onClick={buscador}>Search</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default FiltroCoffeeComponents;
