import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la redirección
import axios from 'axios';
import '../Register/Register.css'; // Importamos los estilos

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Verificar el token de admin al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenemos el token desde localStorage
    if (!token) {
      // Si no hay token, redirigimos al usuario a la página de login
      navigate('/loginAdmin');
    } else {
      // Opcionalmente, podrías verificar aquí la validez del token con una petición al servidor
      axios.get('https://www.imperioticket.com/api/verifyToken', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.data.valid) {
            localStorage.removeItem('token'); // Remover el token si no es válido
            navigate('/loginAdmin'); // Redirigir a la página de login
          }
        })
        .catch(error => {
          console.error('Error al verificar el token:', error);
          navigate('/loginAdmin'); // Redirigir si hay un error
        });
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.imperioticket.com/api/register', {
        username,
        password,
      });

      // Si el registro es exitoso, guardar el token y redirigir
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
        window.location.href = response.data.redirectUrl; // Redirigir a la URL recibida
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleRegister} className="formHerR">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
