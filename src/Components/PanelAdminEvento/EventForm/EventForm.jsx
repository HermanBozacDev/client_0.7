const EventForm = ({ nuevoEvento, setNuevoEvento, crearEvento }) => (
  <form onSubmit={crearEvento}>
    <h2>Crear Nuevo Evento</h2>
    {Object.keys(nuevoEvento).map((key) => (
      <input
        key={key}
        type={key === 'fecha' ? 'date' : key === 'hora' ? 'time' : 'text'}
        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
        value={nuevoEvento[key]}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, [key]: e.target.value })}
        required
      />
    ))}
    <button type="submit">Crear Evento</button>
  </form>
);
