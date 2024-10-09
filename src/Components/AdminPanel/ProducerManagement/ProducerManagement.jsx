import React from 'react';
import ProductorRegister from '../ProductorRegister/ProductorRegister';
import ProductorDelete from '../ProductorDelete/ProductorDelete';

const ProducerManagement = ({ producerUsers, setProducerUsers }) => {
  return (
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

      {/* Usamos el subcomponente ProductorRegister */}
      <ProductorRegister />
      {/* Usamos el subcomponente ProductorDelete */}
      <ProductorDelete producerUsers={producerUsers} setProducerUsers={setProducerUsers} />
    </div>
  );
};

export default ProducerManagement;
