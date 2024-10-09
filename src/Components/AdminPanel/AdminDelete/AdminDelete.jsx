import React, { useState } from 'react';
import axios from 'axios';

const AdminDelete = ({ users, setUsers }) => {
  const [deleteAdminUsername, setDeleteAdminUsername] = useState('');

  const handleAdminDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('superadmin');
    const body = { username: deleteAdminUsername }; // Usuario administrador a eliminar

    axios.delete('https://www.imperioticket.com/api/adminDelete', {
      headers: { Authorization: `Bearer ${token}` },
      data: body, // Enviar el username en el cuerpo
    })
    .then(response => {
      console.log('Administrador eliminado con éxito:', response.data);
      // Actualizar la lista de administradores
      setUsers(users.filter(user => user.username !== deleteAdminUsername));
      setDeleteAdminUsername(''); // Limpiar el campo de entrada
    })
    .catch(error => {
      console.error('Error al eliminar el administrador:', error);
    });
  };

  return (
    <div>
      <h2>Eliminar Admin</h2>
      <form onSubmit={handleAdminDelete}>
        <input
          type="text"
          placeholder="Nombre del admin a eliminar"
          value={deleteAdminUsername}
          onChange={(e) => setDeleteAdminUsername(e.target.value)}
          required
        />
        <button type="submit">Eliminar Admin</button>
      </form>
    </div>
  );
};

export default AdminDelete;
