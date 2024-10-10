const ActionSelector = ({ onSelect }) => (
  <div>
    <h2>Seleccionar Acción</h2>
    <button onClick={() => onSelect('crear')}>Crear Evento</button>
    <button onClick={() => onSelect('eliminar')}>Eliminar Evento</button>
    <button onClick={() => onSelect('editar')}>Editar Evento</button>
  </div>
);
