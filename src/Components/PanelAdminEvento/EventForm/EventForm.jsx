import React from 'react';

const EventForm = ({ nuevoEvento, setNuevoEvento, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Crear Nuevo Evento</h2>
      <input type="text" placeholder="Título" value={nuevoEvento.title} onChange={(e) => setNuevoEvento({ ...nuevoEvento, title: e.target.value })} required />
      <input type="text" placeholder="Clasificación" value={nuevoEvento.clasificacion} onChange={(e) => setNuevoEvento({ ...nuevoEvento, clasificacion: e.target.value })} required />
      <input type="text" placeholder="Descripción" value={nuevoEvento.description} onChange={(e) => setNuevoEvento({ ...nuevoEvento, description: e.target.value })} required />
      <input type="text" placeholder="Día" value={nuevoEvento.dia} onChange={(e) => setNuevoEvento({ ...nuevoEvento, dia: e.target.value })} required />
      <input type="date" value={nuevoEvento.fecha} onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })} required />
      <input type="time" value={nuevoEvento.hora} onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora: e.target.value })} required />
      <input type="text" placeholder="Lugar" value={nuevoEvento.lugar} onChange={(e) => setNuevoEvento({ ...nuevoEvento, lugar: e.target.value })} required />
      <input type="number" placeholder="Precio" value={nuevoEvento.price} onChange={(e) => setNuevoEvento({ ...nuevoEvento, price: e.target.value })} required />
      <input type="number" placeholder="Cantidad" value={nuevoEvento.quantity} onChange={(e) => setNuevoEvento({ ...nuevoEvento, quantity: e.target.value })} required />
      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default EventForm;
