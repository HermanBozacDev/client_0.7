import React, { useState } from 'react';
import axios from 'axios';

// Función para obtener usuarios administradores
const AdminUsers = (token, setAdminUsers) => {
  console.log('[AdminUsers] Obteniendo usuarios administradores...', token);

  axios.get('https://www.imperioticket.com/api/adminUsers', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(response => {
    console.log('[AdminUsers] Respuesta de la API:', response.data);
    if (Array.isArray(response.data)) {
      setAdminUsers(response.data); // Guardar los usuarios administradores
    } else {
      console.error('[AdminUsers] Respuesta no válida:', response.data);
      setAdminUsers([]); // Limpiar el estado si no es un array
    }
  })
  .catch(error => {
    console.error('[AdminUsers] Error al obtener usuarios administradores:', error);
    setAdminUsers([]);
  });
};
export default AdminUsers
