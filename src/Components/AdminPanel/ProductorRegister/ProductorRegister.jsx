import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la redirección
import axios from 'axios';

const ProductorRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje de éxito
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Verificar el token de superadmin al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('superadmin'); // Obtenemos el token desde localStorage
    if (!token) {
      // Si no hay token, redirigimos al usuario a la página de login
      navigate('/loginAdmin');
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.imperioticket.com/api/productorRegister', {
        username,
        password,
        role: "productor", // Especificamos el rol de productor
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('superadmin')}`, // Token de autorización
        },
      });

      if (response.status === 201) {
        setMessage('Usuario registrado exitosamente'); // Mostrar mensaje de éxito
        setUsername(''); // Limpiar el campo de username
        setPassword(''); // Limpiar el campo de password
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Productor</h2>
      <form onSubmit={handleRegister} className="formHerR">
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar Productor</button>
      </form>
      {message && <p>{message}</p>} {/* Mostrar mensaje de éxito */}
    </div>
  );
};

export default ProductorRegister;
