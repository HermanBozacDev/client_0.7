const EventList = ({ eventos, onDelete }) => (
  <div>
    <h2>Eventos Existentes</h2>
    <ul>
      {eventos.map((evento) => (
        <li key={evento._id}>
          <h3>{evento.title}</h3>
          <button onClick={() => onDelete(evento._id)}>Eliminar Evento</button>
        </li>
      ))}
    </ul>
  </div>
);
export default EventList
