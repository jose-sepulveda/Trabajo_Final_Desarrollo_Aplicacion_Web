import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { createTestimonial } from '../services/api';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

const Testimonio = ({ idCoffee, username }) => {
    const [testimonialData, setTestimonialData] = useState('');
    const [show, setShow] = useState(false);
    const { auth } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.role !== 'CUSTOMER') {
            toast.error('Solo los clientes pueden crear testimonios');
            return;
        }

        try {
            const data = await createTestimonial(auth.token, idCoffee, username, { testimonial: testimonialData });
            toast.success('Testimonio creado con éxito');
            console.log('Datos del testimonio creado:', data);
            handleClose();
        } catch (error) {
            toast.error('Error al crear el testimonio');
            console.error('Error:', error);
        }
    };

    return (
        <>
            {auth.role === 'CUSTOMER' && (  
                <Button variant="primary" onClick={handleShow}>
                    Crear Testimonio
                </Button>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Testimonio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="testimonial">Testimonio:</label>
                            <textarea
                                className="form-control"
                                id="testimonial"
                                value={testimonialData}
                                onChange={(e) => setTestimonialData(e.target.value)}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Testimonio;
