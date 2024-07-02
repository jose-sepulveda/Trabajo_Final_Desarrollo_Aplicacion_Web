import React, { useState } from 'react';
import CoffeesList from '../components/CoffeesList';
import FiltroCoffeeComponents from '../components/FiltroCoffeeComponents';

function CoffeesPage() {
    const [filtroCoffee, setfiltroCoffee] = useState(null);

    const filtrar = (coffeeData) => {
        setfiltroCoffee(coffeeData);
    };

    return (
        <>
            <h3>Coffees de cliente</h3>
            <FiltroCoffeeComponents filtrar={filtrar} /> {/* Ensure the prop name is 'filtrar' */}
            {filtroCoffee && (
                <div>
                    <h2>Coffee Filtered:</h2>
                    <p>Name: {filtroCoffee.name}</p>
                    <p>Description: {filtroCoffee.description}</p>
                    <p>Price: {filtroCoffee.price}</p>
                </div>
            )}
            <CoffeesList />
        </>
    );
}

export { CoffeesPage };
