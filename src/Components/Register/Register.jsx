import React, { useState } from 'react';
import axios from 'axios';
import '../Register/Register.css'; // Importamos los estilos

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.imperioticket.com/api/register', {
        username,
        password,
      });

      // Si el registro es exitoso, guardar el token y redirigir
      if (response.status === 201) {
        // Guardar el token en localStorage
        localStorage.setItem('token', response.data.token);

        // Redirigir a la URL recibida en la respuesta
        window.location.href = response.data.redirectUrl;
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

