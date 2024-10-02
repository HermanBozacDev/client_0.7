import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import Register from '../Register/Register.jsx';
import RegisterAdmin from '../RegisterAdmin/RegisterAdmin.jsx';

import ProductorDelete from './ProductorDelete/ProductorDelete';

import AdminRegister from './AdminRegister/AdminRegister';
import AdminDelete from './AdminDelete/AdminDelete';



const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');
  const [users, setUsers] = useState([]);
  const [producerUsers, setProducerUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [deleteUsername, setDeleteUsername] = useState('');
  const [deleteAdminUsername, setDeleteAdminUsername] = useState('');
  
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
    }else if (activePage === 'Settings') {
      console.log('[useEffect] Obteniendo usuarios productores...', token);
      axios.get('https://www.imperioticket.com/api/productorUsers', {
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
 
  // Función para manejar el formulario de registro de un nuevo usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`[handleInputChange] Cambiando valor de ${name}:`, value);
    setNewUser({ ...newUser, [name]: value });
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
      
      {/* Usamos el subcomponente AdminRegister */}
      <AdminRegister users={users} setUsers={setUsers} />

      {/* Usamos el subcomponente AdminDelete */}
      <AdminDelete users={users} setUsers={setUsers} />
  
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
      
      <h2>Registrar Nuevo Productor</h2>
      <Register />
      {/* Usamos el subcomponente ProductorDelete */}
      <ProductorDelete producerUsers={producerUsers} setProducerUsers={setProducerUsers} /> 
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
        return renderProducers();
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
