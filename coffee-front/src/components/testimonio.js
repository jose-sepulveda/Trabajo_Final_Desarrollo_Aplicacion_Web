import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { createTestimonial } from '../services/api';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

const Testimonio = ({ idCoffee }) => {
    const [testimonialData, setTestimonialData] = useState('');
    const [show, setShow] = useState(false);
    const { auth } = useContext(AuthContext);

    const cerrarModal = () => setShow(false);
    const mostrarModal = () => setShow(true);

    const envioModal = async (e) => {
        e.preventDefault();
        if (auth.role !== 'CUSTOMER') {
            toast.error('Solo los clientes pueden crear testimonios');
            return;
        }

        try {
            const data = await createTestimonial(auth.token, idCoffee, auth.username, { testimonial: testimonialData });
            toast.success('Testimonio creado con éxito');
            console.log('Datos del testimonio creado:', data);
            cerrarModal();
        } catch (error) {
            toast.error('Error al crear el testimonio');
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={mostrarModal}>
                Crear Testimonio
            </Button>

            <Modal show={show} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Testimonio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={envioModal}>
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
