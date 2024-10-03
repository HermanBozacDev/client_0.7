
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('[handleLogin] - Intentando iniciar sesión con:', { username, password });
    
    try {
      const response = await axios.post('https://www.imperioticket.com/api/adminLogin', {
        username,
        password,
      });

      // Aquí asumes que el token se envía en la respuesta y lo guardas
      const { token } = response.data; // Asegúrate de que esto coincide con tu respuesta

      // Guardar el token en el almacenamiento local
      localStorage.setItem('superadmin', token);
      
      console.log('[handleLogin] - Respuesta del servidor:', response.data);
      navigate('/panelAdmin'); // Redirige a la página de administración
    } catch (error) {
      console.error('[handleLogin] - Error al iniciar sesión:', error);
      alert(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleLogin} className="formHer">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          console.log('[Input] - Cambiando username a:', e.target.value);
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          console.log('[Input] - Cambiando password a:', e.target.value);
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
