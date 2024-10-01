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
    const token = localStorage.getItem('superadmin'); // Obtenemos el token desde localStorage
    console.log('[useEffect] Token encontrado:', token);

    if (!token) {
      // Si no hay token, redirigimos al usuario a la página de login
      console.log('[useEffect] No se encontró token, redirigiendo a /loginAdmin...');
      navigate('/loginAdmin');
    } else {
        .then(response => {
          console.log('[useEffect] Respuesta de verificación del token:', response.data);
          if (!response.data.valid) {
            console.log('[useEffect] Token inválido, redirigiendo a /loginAdmin...');
            localStorage.removeItem('token'); // Remover el token si no es válido
            navigate('/loginAdmin'); // Redirigir a la página de login
          } else {
            console.log('[useEffect] Token válido.');
          }
        })
        .catch(error => {
          console.error('[useEffect] Error al verificar el token:', error);
          navigate('/loginAdmin'); // Redirigir si hay un error
        });
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('[handleRegister] Intentando registrar usuario:', { username, password });

    try {
      const response = await axios.post('https://www.imperioticket.com/api/register', {
        username,
        password,
      });

      console.log('[handleRegister] Respuesta de la API:', response.data);

      // Si el registro es exitoso, guardar el token y redirigir
      if (response.status === 201) {
        console.log('[handleRegister] Registro exitoso, guardando token y redirigiendo...');
        localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
        window.location.href = response.data.redirectUrl; // Redirigir a la URL recibida
      } else {
        console.error('[handleRegister] Error en el registro:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('[handleRegister] Error al registrar el usuario:', error.response?.data?.message || 'Error al registrar');
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
