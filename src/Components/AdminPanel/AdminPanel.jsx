import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para hacer las peticiones HTTP
import './AdminPanel.css';

const AdminPanel = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  // Hook para obtener usuarios cuando se selecciona la página de 'Users'
  useEffect(() => {
    if (activePage === 'Users') {
      console.log('[useEffect] Obteniendo usuarios...');
      axios.get('https://www.imperioticket.com/api/adminUsers')
        .then(response => {
          console.log('[useEffect] Respuesta de la API:', response.data);
          if (Array.isArray(response.data)) {
            console.log('[useEffect] La respuesta es un array. Usuarios encontrados:', response.data.length);
            setUsers(response.data);
          } else {
            console.error('[useEffect] La respuesta no es un array:', response.data);
            setUsers([]);
          }
        })
        .catch(error => {
          console.error('[useEffect] Error al obtener los usuarios:', error);
          setUsers([]); // Asegúrate de que users siempre sea un array
        });
    }
  }, [activePage]);

  // Función para manejar el formulario de registro de un nuevo usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`[handleInputChange] Cambiando valor de ${name}:`, value);
    setNewUser({ ...newUser, [name]: value });
  };

  // Función para registrar un nuevo usuario desde el panel
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('[handleRegister] Registrando nuevo usuario:', newUser);
    axios.post('/registerAdmin', newUser)
      .then(response => {
        console.log('[handleRegister] Usuario registrado con éxito:', response.data);
        setUsers([...users, newUser]); // Añadir el nuevo usuario a la lista
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

  const renderContent = () => {
    console.log('[renderContent] Renderizando página activa:', activePage);
    switch (activePage) {
      case 'Dashboard':
        return <h2>Dashboard</h2>;
      case 'Users':
        return renderUsers();
      case 'Settings':
        return <h2>Settings</h2>;
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
      </div>
      <div className="main-content">
        <div className="header">
          <h1>{activePage}</h1>
          <button className="logout-button">Logout</button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
