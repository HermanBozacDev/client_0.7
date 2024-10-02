import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la redirección
import axios from 'axios';
import '../Register/Register.css'; // Importamos los estilos

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje de éxito
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Verificar el token de admin al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('superadmin'); // Obtenemos el token desde localStorage
    console.log('[useEffect] Token encontrado:', token);

    if (!token) {
      // Si no hay token, redirigimos al usuario a la página de login
      console.log('[useEffect] No se encontró token, redirigiendo a /loginAdmin...');
      navigate('/loginAdmin');
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('[handleRegisterProductor] Intentando registrar usuario:', { username, password });

    try {
      const response = await axios.post('https://www.imperioticket.com/api/register', {
        username,
        password,
        role: "productor",
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('superadmin')}`,
        },
      });

      console.log('[handleRegisterProductor] Respuesta de la API:', response.data);

      if (response.status === 201) {
        console.log('[handleRegister] Registro exitoso');
        setMessage('Usuario registrado exitosamente'); // Mostrar mensaje de éxito
        setUsername(''); // Limpiar el campo de username
        setPassword(''); // Limpiar el campo de password
      } else {
        console.error('[handleRegisterProductor] Error en el registro:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('[handleRegisterProductor] Error al registrar el usuario:', error.response?.data?.message || 'Error al registrar');
      alert(error.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div>
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
      {message && <p>{message}</p>} {/* Mostrar mensaje de éxito */}
    </div>
  );
};

export default Register;
