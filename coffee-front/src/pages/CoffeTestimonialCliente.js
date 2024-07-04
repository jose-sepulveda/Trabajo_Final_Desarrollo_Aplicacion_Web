import React, { useState } from 'react';
import CoffeesList from '../components/CoffeesList';
import FiltroCoffeeComponents from '../components/FiltroCoffeeComponents';
import '../Styles/testimonioCliente.css';


function CoffeTestimonialCliente() {
    const [filtroCoffee, setfiltroCoffee] = useState(null);

    const filtrar = (coffeeData) => {
        setfiltroCoffee(coffeeData);
    };

    return (
        <div className='container'>
            <h3>Coffees de cliente</h3>
                <FiltroCoffeeComponents filtrar={filtrar} /> 
                {filtroCoffee && (
                    <div>
                        <h2>Coffee Filtered:</h2>
                        <p>Name: {filtroCoffee.name}</p>
                        <p>Description: {filtroCoffee.description}</p>
                        <p>Price: {filtroCoffee.price}</p>
                    </div>
                )}
            <CoffeesList />
        </div>
    );
}

export {CoffeTestimonialCliente};
