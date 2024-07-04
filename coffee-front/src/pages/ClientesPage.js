import React, { useEffect, useState } from 'react';
import { getUsersData, blockUser } from '../services/api';
import '../Styles/clientesPage.css'; 

function ClientesPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const ObtUsers = async () => {
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

        ObtUsers();

    }, []);

    const bloqueaar = async (username, isLocked) => {
        try {
            const token = localStorage.getItem('token');
            await blockUser(username, token); 
            setUsers(prevUsers => prevUsers.map(user =>
                user.username === username ? { ...user, locked: !isLocked } : user
            ));
        } catch (error) {
            console.error('Error al bloquear/desbloquear usuario:', error);
        }
    };

    return (
        <div className="container">
            <h2>Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Locked</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.locked.toString()}</td>
                            <td>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={user.locked}
                                        onChange={() => bloqueaar(user.username, user.locked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { ClientesPage };
