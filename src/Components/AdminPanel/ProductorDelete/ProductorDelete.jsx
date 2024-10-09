import React, { useState } from 'react';
import axios from 'axios';

const ProductorDelete = ({ producerUsers, setProducerUsers }) => {
  const [deleteUsername, setDeleteUsername] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('superadmin');
    const body = { username: deleteUsername }; // Usuario a eliminar

    axios.delete('https://www.imperioticket.com/api/productorDelete', {
      headers: { Authorization: `Bearer ${token}` },
      data: body, // Enviar el nombre de usuario a eliminar
    })
    .then(response => {
      console.log('Productor eliminado con éxito:', response.data);
      // Actualizar la lista de usuarios productores
      setProducerUsers(producerUsers.filter(user => user.username !== deleteUsername));
      setDeleteUsername(''); // Limpiar el input
    })
    .catch(error => {
      console.error('Error al eliminar el productor:', error);
    });
  };

  return (
    <div>
      <h2>Eliminar Productor</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Nombre del productor a eliminar"
          value={deleteUsername}
          onChange={(e) => setDeleteUsername(e.target.value)}
          required
        />
        <button type="submit">Eliminar Productor</button>
      </form>
    </div>
  );
};

export default ProductorDelete;
