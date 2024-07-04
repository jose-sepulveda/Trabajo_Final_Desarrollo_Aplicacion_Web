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
            <h3>Coffees de general y admin</h3>
            <FiltroCoffeeComponents filtrar={filtrar} /> 
            {filtroCoffee && (
                <div className='datos-card'>
                    <div className='imagen'>
                        <img src={`data:image/jpeg;base64,${filtroCoffee.image64}`} alt={filtroCoffee.name} className="coffee-image" />
                    </div>
                    <div className='detalle-filtro'>
                        <h2>Coffee filtrado</h2>
                        <p>Nombre Coffee: {filtroCoffee.name}</p>
                        <p>Descripción: {filtroCoffee.description}</p>
                        <p>Precio: {filtroCoffee.price}</p>
                    </div>
                </div>
            )}
            <CoffeesList />
        </div>
    );
}

export {CoffeTestimonialCliente};
