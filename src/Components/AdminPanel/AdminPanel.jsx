import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <h2>Dashboard</h2>;
      case 'Users':
        return <h2>Users</h2>;
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
