import React, { useState } from 'react';
import CoffeesList from '../components/CoffeesList';
import FiltroCoffeeComponents from '../components/FiltroCoffeeComponents';

function CoffeTestimonialCliente() {
    const [filteredCoffee, setFilteredCoffee] = useState(null);

    const filtrar = (coffeeData) => {
        setFilteredCoffee(coffeeData);
    };

    return (
        <>
            <h3>Coffees de cliente</h3>
            <FiltroCoffeeComponents filtrar={filtrar} /> {/* Ensure the prop name is 'filtrar' */}
            {filteredCoffee && (
                <div>
                    <h2>Coffee Filtered:</h2>
                    <p>Name: {filteredCoffee.name}</p>
                    <p>Description: {filteredCoffee.description}</p>
                    <p>Price: {filteredCoffee.price}</p>
                </div>
            )}
            <CoffeesList />
        </>
    );
}

export { CoffeTestimonialCliente };
