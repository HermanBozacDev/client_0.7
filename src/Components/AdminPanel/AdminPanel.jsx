import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import Register from '../Register/Register.jsx';
import RegisterAdmin from '../RegisterAdmin/RegisterAdmin.jsx';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');
  const [adminUsers, setAdminUsers] = useState([]); // Usuarios administradores
  const [producerUsers, setProducerUsers] = useState([]); // Usuarios productores
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  console.log(localStorage.getItem('superadmin'));

  // Hook para obtener usuarios administradores cuando se selecciona la página de 'Users'
  useEffect(() => {
    const token = localStorage.getItem('superadmin');
    if (!token) {
      navigate('/loginAdmin'); // Redirigir si no hay token
    } else if (activePage === 'Users') {
      console.log('[useEffect] Obteniendo usuarios administradores...', token);
      axios.get('https://www.imperioticket.com/api/adminUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('[useEffect] Respuesta de la API:', response.data);
        if (Array.isArray(response.data)) {
          setAdminUsers(response.data); // Guardar los usuarios administradores
        } else {
          console.error('[useEffect] Respuesta no válida:', response.data);
          setAdminUsers([]);
        }
      })
      .catch(error => {
        console.error('[useEffect] Error al obtener usuarios:', error);
        setAdminUsers([]);
      });
    } else if (activePage === 'Settings') {
      console.log('[useEffect] Obteniendo usuarios productores...', token);
      axios.get('https://www.imperioticket.com/api/producerUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('[useEffect] Respuesta de la API:', response.data);
        if (Array.isArray(response.data)) {
          setProducerUsers(response.data); // Guardar los usuarios productores
        } else {
          console.error('[useEffect] Respuesta no válida:', response.data);
          setProducerUsers([]);
        }
      })
      .catch(error => {
        console.error('[useEffect] Error al obtener productores:', error);
        setProducerUsers([]);
      });
    }
  }, [activePage, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('superadmin');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    axios.post('https://www.imperioticket.com/api/registerAdmin', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('[handleRegister] Usuario registrado con éxito:', response.data);
      setAdminUsers([...adminUsers, newUser]);
      setNewUser({ username: '', password: '' });
    })
    .catch(error => {
      console.error('[handleRegister] Error al registrar el usuario:', error);
    });
  };

  const renderUsers = () => (
    <div>
      <h2>Lista de Usuarios Administradores</h2>
      {Array.isArray(adminUsers) && adminUsers.length > 0 ? (
        <ul>
          {adminUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios administradores disponibles.</p>
      )}

      <h2>Registrar Nuevo Admin</h2>
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
        <button type="submit">Registrar Admin</button>
      </form>
    </div>
  );

  const renderProducers = () => (
    <div>
      <h2>Lista de Usuarios Productores</h2>
      {Array.isArray(producerUsers) && producerUsers.length > 0 ? (
        <ul>
          {producerUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios productores disponibles.</p>
      )}
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('superadmin');
    navigate('/loginAdmin');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <h2>Dashboard</h2>;
      case 'Users':
        return renderUsers();
      case 'Settings':
        return renderProducers(); // Mostrar lista de productores en Settings
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
