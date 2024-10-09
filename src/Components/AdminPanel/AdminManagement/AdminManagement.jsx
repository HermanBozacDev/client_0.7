import React from 'react';
import AdminRegister from '../AdminRegister/AdminRegister';
import AdminDelete from '../AdminDelete/AdminDelete';

const AdminManagement = ({ adminUsers, setAdminUsers }) => {
  return (
    <div>
      <h2>Lista de Usuarios Administradores</h2>
      {Array.isArray(adminUsers) && adminUsers.length > 0 ? (
        <ul>
          {adminUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}

      {/* Usamos el subcomponente AdminRegister */}
      <AdminRegister users={adminUsers} setUsers={setAdminUsers} />

      {/* Usamos el subcomponente AdminDelete */}
      <AdminDelete users={adminUsers} setUsers={setAdminUsers} />
    </div>
  );
};

export default AdminManagement;
