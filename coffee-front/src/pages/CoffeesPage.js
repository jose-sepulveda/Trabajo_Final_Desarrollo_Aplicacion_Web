import React, { useState } from 'react';
import CoffeesList from '../components/CoffeesList';
import FiltroCoffeeComponents from '../components/FiltroCoffeeComponents';
import '../Styles/testimonioCliente.css';

function CoffeesPage() {
    const [filtroCoffee, setfiltroCoffee] = useState(null);

    const filtrar = (coffeeData) => {
        setfiltroCoffee(coffeeData);
    };

    const limpiarBusqueda = () => {
        setfiltroCoffee(null);
    };

    return (
        <div className='container'>
            <h3>Coffees</h3>
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
                        <button onClick={limpiarBusqueda} className="btn-limpiar">Limpiar búsqueda</button>
                    </div>
                </div>
            )}
            <CoffeesList />
        </div>
    );
}

export { CoffeesPage };
