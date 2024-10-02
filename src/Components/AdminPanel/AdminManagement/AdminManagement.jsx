import React from 'react';
import AdminRegister from '../AdminRegister/AdminRegister';
import AdminDelete from '../AdminDelete/AdminDelete';

const AdminManagement = ({ users, setUsers }) => {
  return (
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
};

export default AdminManagement;
