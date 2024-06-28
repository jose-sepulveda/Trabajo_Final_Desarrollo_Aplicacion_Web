import React, { useEffect, useState } from 'react';
import { getUsersData } from '../services/api';
import '../Styles/clientesPage.css'; // Importa el archivo CSS con los estilos

function ClientesPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getUsersData(token);

                if (data) {
                    setUsers(data);
                } else {
                    console.error('Error al obtener datos de usuarios');
                }
            } catch (error) {
                console.error('Error al obtener datos de usuarios:', error);
            }
        };

        fetchUsers();

    }, []);

    return (
        <div className="container">
            <h2>Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Locked</th>
                        <th>Disabled</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.locked ? 'Sí' : 'No'}</td>
                            <td>{user.disabled ? 'Sí' : 'No'}</td>
                            <td>{}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { ClientesPage };
