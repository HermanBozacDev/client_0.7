import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './ProductorLogin.css'; // Importamos los estilos

const ProductorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.imperioticket.com/api/productorLogin', {
        username,
        password,
      });

      // Aquí asumes que el token se envía en la respuesta y lo guardas
      const { token } = response.data; // Asegúrate de que esto coincide con tu respuesta

      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', token);

      // Redirigir a la página protegida
      navigate('/panelAdminEvento'); // Redirige a la página de administración
    } catch (error) {
      alert(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleLogin} className="formHer">
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
      <button type="submit">Login</button>
    </form>
  );
};

export default ProductorLogin;
