import React, { useState, useEffect, useContext } from 'react';
import { getTestimonioCoffee } from '../services/api';
import { AuthContext } from '../auth/AuthContext';

function ListaTestimonio({ idCoffee }) {
    const { auth } = useContext(AuthContext);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const coffeeTestimonials = await getTestimonioCoffee(idCoffee);
                setTestimonials(coffeeTestimonials);
            } catch (error) {
                console.error(`Error al encontrar cafe por id${idCoffee}:`, error);
            }
        };

        fetchTestimonials();
    }, [idCoffee, auth.token]);

    return (
        <div className="lista-testimonios">
            <h3>Testimonios de Café #{idCoffee}</h3>
            {testimonials.map((testimonial, index) => (
                <div key={index}>
                    <strong>{testimonial.username}:</strong> {testimonial.testimonial}
                </div>
            ))}
        </div>
    );
}

export default ListaTestimonio;
