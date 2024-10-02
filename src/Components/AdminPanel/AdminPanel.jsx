import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

import ProducerManagement from './ProducerManagement/ProducerManagement';
import AdminManagement from './AdminManagement/AdminManagement';

import VerifyToken from './VerifyToken/VerifyToken';
import AdminUsers from './AdminUsers/AdminUsers';
import ProductorUsers from './ProductorUsers/ProductorUsers';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');
  const [adminUsers, setAdminUsers] = useState([]);
  const [producerUsers, setProducerUsers] = useState([]);
  
  console.log(localStorage.getItem('superadmin'));

  // Hook para obtener usuarios administradores o productores según la página activa
  useEffect(() => {
    const token = VerifyToken(navigate);
    if (!token) return;
    if (activePage === 'AdminUsers') {
    AdminUsers(token, setAdminUsers); // Llamar la función para obtener admins
    } else if (activePage === 'ProductorUsers') {
    ProductorUsers(token, setProducerUsers); // Llamar la función para obtener productores
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
      case 'AdminUsers':
        return <AdminManagement adminUsers={adminUsers} setAdminUsers={setAdminUsers} />;
      case 'ProductorUsers':
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
          <li onClick={() => setActivePage('AdminUsers')}>AdminUsers</li>
          <li onClick={() => setActivePage('ProductorUsers')}>ProductorUsers</li>
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
