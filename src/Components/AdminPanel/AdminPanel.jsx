import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import './AdminPanel.css';
import Register from '../Register/Register.jsx'; // Ajusta la ruta según la estructura de tu proyecto



const AdminPanel = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [activePage, setActivePage] = useState('Dashboard');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  console.log(localStorage.getItem('token'))

  // Hook para obtener usuarios cuando se selecciona la página de 'Users'
  useEffect(() => {
    

    const token = localStorage.getItem('token'); // Verificar si el token está presente
    if (!token) {
      // Si no hay token, redirigir al usuario a la página de login
      navigate('/loginAdmin');
    } else if (activePage === 'Users') {
      console.log('[useEffect] Obteniendo usuarios...');
      axios.get('https://www.imperioticket.com/api/adminUsers', {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en las cabeceras
        },
      })
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
  }, [activePage, navigate]);

  // Función para manejar el formulario de registro de un nuevo usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`[handleInputChange] Cambiando valor de ${name}:`, value);
    setNewUser({ ...newUser, [name]: value });
  };

const handleRegister = (e) => {
  e.preventDefault();
  
  // Obtener el token del admin que está realizando la solicitud
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token no encontrado');
    return;
  }

  console.log('[handleRegister] Registrando nuevo usuario:', newUser);

  // Realizar la solicitud para registrar un nuevo admin user
  axios.post('https://www.imperioticket.com/api/registerAdmin', newUser, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token del admin actual en las cabeceras
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


  console.log('[handleRegister] Registrando nuevo usuario:', newUser);

  // Realizar la solicitud para registrar un nuevo admin user
  axios.post('https://www.imperioticket.com/api/registerAdmin', newUser, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token del admin actual en las cabeceras
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
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de login
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
        <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Botón para cerrar sesión */}
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
