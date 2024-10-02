import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = ({ users, setUsers }) => {
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  // Manejar los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Función para registrar un nuevo usuario desde el panel
  const handleRegister = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('superadmin');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    axios.post('https://www.imperioticket.com/api/adminRegister', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Usuario registrado con éxito:', response.data);

        // Actualizar la lista de usuarios y limpiar el formulario
        setUsers([...users, newUser]);
        setNewUser({ username: '', password: '' }); // Limpiar el formulario
      })
      .catch(error => {
        console.error('Error al registrar el usuario:', error);
      });
  };

  return (
    <div>
      <h2>Registrar Nuevo Admin</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={newUser.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Registrar Admin</button>
      </form>
    </div>
  );
};

export default AdminRegister;
