import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

import ProducerManagement from './ProducerManagement/ProducerManagement';
import AdminManagement from './AdminManagement/AdminManagement';

import VerifyToken from './VerifyToken/VerifyToken';


const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');
  const [adminUsers, setAdminUsers] = useState([]);
  const [producerUsers, setProducerUsers] = useState([]);
  
  console.log(localStorage.getItem('superadmin'));

  // Hook para obtener usuarios administradores o productores según la página activa
  useEffect(() => {
    const token = verifyToken(navigate);
    if (!token) return;
    if (activePage === 'Users') {
      console.log('[useEffect] Obteniendo usuarios administradores...', token);

      axios.get('https://www.imperioticket.com/api/adminUsers', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log('[useEffect] Respuesta de la API:', response.data);
        if (Array.isArray(response.data)) {
          setAdminUsers(response.data); // Guardar los usuarios administradores
        } else {
          console.error('[useEffect] Respuesta no válida:', response.data);
          setAdminUsers([]); // Limpiar el estado si no es un array
        }
      })
      .catch(error => {
        console.error('[useEffect] Error al obtener usuarios administradores:', error);
        setAdminUsers([]);
      });
    } else if (activePage === 'Settings') {
      console.log('[useEffect] Obteniendo usuarios productores...', token);

      axios.get('https://www.imperioticket.com/api/productorUsers', {
        headers: { Authorization: `Bearer ${token}` },
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
        console.error('[useEffect] Error al obtener usuarios productores:', error);
        setProducerUsers([]);
      });
    }
  }, [activePage, navigate]);
     


  const handleLogout = () => {
    localStorage.removeItem('superadmin');
    navigate('/loginAdmin');
  };

  // Función para renderizar el contenido según la página activa
  const renderContent = () => {
    console.log('[renderContent] Renderizando página activa:', activePage);
    switch (activePage) {
      case 'Dashboard':
        return <h2>Dashboard</h2>;
      case 'Users':
        return <AdminManagement adminUsers={adminUsers} setAdminUsers={setAdminUsers} />;
      case 'Settings':
        return <ProducerManagement producerUsers={producerUsers} setProducerUsers={setProducerUsers} />;
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
