import React, { useState } from 'react';
import axios from 'axios';

// Función para obtener usuarios productores
const ProductorUsers = (token, setProducerUsers) => {
  console.log('[ProductorUsers] Obteniendo usuarios productores...', token);

  axios.get('https://www.imperioticket.com/api/productorUsers', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(response => {
    console.log('[ProductorUsers] Respuesta de la API:', response.data);
    if (Array.isArray(response.data)) {
      setProducerUsers(response.data); // Guardar los usuarios productores
    } else {
      console.error('[ProductorUsers] Respuesta no válida:', response.data);
      setProducerUsers([]); // Limpiar el estado si no es un array
    }
  })
  .catch(error => {
    console.error('[ProductorUsers] Error al obtener usuarios productores:', error);
    setProducerUsers([]);
  });
};
export default ProductorUsers
