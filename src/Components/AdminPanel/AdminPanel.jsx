import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import Register from '../Register/Register.jsx';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  console.log(localStorage.getItem('superadmin'));

  // Hook para obtener usuarios cuando se selecciona la página de 'Users'
  useEffect(() => {
    const token = localStorage.getItem('superadmin');
    if (!token) {
      navigate('/loginAdmin'); // Redirigir si no hay token
    } else if (activePage === 'Users') {
      console.log('[useEffect] Obteniendo usuarios...',token);
      
      // Realizar la solicitud GET para obtener usuarios
      axios.get('https://www.imperioticket.com/api/adminUsers', {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en las cabeceras
        },
      })
      .then(response => {
        console.log('[useEffect] Respuesta de la API:', response.data);
        if (Array.isArray(response.data)) {
          console.log('[useEffect] Usuarios encontrados:', response.data.length);
          setUsers(response.data); // Guardar los usuarios en el estado
        } else {
          console.error('[useEffect] Respuesta no válida:', response.data);
          setUsers([]); // Limpiar el estado si no es un array
        }
      })
      .catch(error => {
        console.error('[useEffect] Error al obtener usuarios:', error);
        setUsers([]); // Limpiar el estado en caso de error
      });
    }
  }, [activePage, navigate]);

  
  // Función para manejar el formulario de registro de un nuevo usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`[handleInputChange] Cambiando valor de ${name}:`, value);
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

    console.log('[handleRegister] Registrando nuevo usuario:', newUser);

    // Realizar la solicitud para registrar un nuevo admin user
    axios.post('https://www.imperioticket.com/api/registerAdmin', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('[handleRegister] Usuario registrado con éxito:', response.data);
        // Aquí puedes recibir el token del nuevo usuario si el backend lo genera
        const newAdminToken = response.data.token;

        // (Opcional) Si necesitas guardar el token del nuevo admin en algún lugar:
        // localStorage.setItem('newAdminToken', newAdminToken);

        // Actualizar la lista de usuarios y limpiar el formulario
        setUsers([...users, newUser]);
        setNewUser({ username: '', password: '' }); // Limpiar el formulario
      })
      .catch(error => {
        console.error('[handleRegister] Error al registrar el usuario:', error);
      });
  };

  const renderUsers = () => (
    <div>
      <h2>Lista de Usuarios</h2>
      {Array.isArray(users) && users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}

      <h2>Registrar Nuevo Usuario</h2>
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('superadmin');
    navigate('/loginAdmin');
  };

  const renderContent = () => {
    console.log('[renderContent] Renderizando página activa:', activePage);
    switch (activePage) {
      case 'Dashboard':
        return <h2>Dashboard</h2>;
      case 'Users':
        return renderUsers();
      case 'Settings':
        return <Register />;
      default:
        return <h2>Dashboard</h2>;
    }
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActivePage('Dashboard')}>Dashboard</li>
          <li onClick={() => setActivePage('Users')}>Users</li>
          <li onClick={() => setActivePage('Settings')}>Settings</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>{activePage}</h1>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
