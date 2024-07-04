import React, { useEffect, useState, useContext } from 'react';
import { getCoffees } from '../services/api';
import { AuthContext } from '../auth/AuthContext';
import Testimonio from '../components/testimonio'; 
import ListaTestimonio from './ListaTestimonio';
import { Modal, Button } from 'react-bootstrap';
import "../Styles/coffePage.css";

function CoffeesList() {
    const { auth } = useContext(AuthContext);
    const { token } = auth;
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const ObtCoffees = async () => {
            try {
                const coffeesData = await getCoffees(token);
                setCoffees(coffeesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        ObtCoffees();
    }, [token]);

    const openModal = (coffee) => {
        setSelectedCoffee(coffee);
        setModalShow(true);
    };

    const closeModal = () => {
        setSelectedCoffee(null);
        setModalShow(false);
    };

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
                    <h5>COFFEE #{coffee.name}</h5>
                    <p>{coffee.description}</p>
                    <p>${coffee.price} </p>
                    <Button variant="primary" onClick={() => openModal(coffee)}>
                        Ver Testimonios
                    </Button>
                    {auth.role === 'CUSTOMER' && (
                        <Testimonio idCoffee={coffee.idCoffee} />
                    )}
                </div>
            ))}
            <Modal show={modalShow} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Testimonios de {selectedCoffee && selectedCoffee.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCoffee && (
                        <ListaTestimonio idCoffee={selectedCoffee.idCoffee} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CoffeesList;
