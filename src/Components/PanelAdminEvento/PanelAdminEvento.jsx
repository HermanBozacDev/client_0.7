// PanelAdminEvento.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../PanelAdminEvento/PanelAdminEvento.css';

const PanelAdminEvento = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({
    clasificacion: '',
    description: '',
    dia: '',
    fecha: '',
    hora: '',
    image: '',
    image2: '',
    imageDetail: '',
    lugar: '',
    price: '',
    quantity: '',
    title: ''
  });
  const [editarEvento, setEditarEvento] = useState(null);

  // Estados para las búsquedas
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaFecha, setBusquedaFecha] = useState('');
  const [busquedaDescripcion, setBusquedaDescripcion] = useState('');
  const [busquedaResultado, setBusquedaResultado] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/AccesoProductores');
    } else {
      obtenerEventos();
    }
  }, [navigate]);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get('https://www.imperioticket.com/api/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const crearEvento = async () => {
    try {
      await axios.post('https://www.imperioticket.com/api/eventos', nuevoEvento);
      setNuevoEvento({
        clasificacion: '',
        description: '',
        dia: '',
        fecha: '',
        hora: '',
        image: '',
        image2: '',
        imageDetail: '',
        lugar: '',
        price: '',
        quantity: '',
        title: ''
      }); // Limpiar el formulario
      obtenerEventos(); // Volver a obtener la lista de eventos
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  const modificarEvento = async (id) => {
    try {
      await axios.put(`https://www.imperioticket.com/api/eventos/${id}`, editarEvento);
      setEditarEvento(null);
      obtenerEventos();
    } catch (error) {
      console.error('Error al modificar evento:', error);
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await axios.delete(`https://www.imperioticket.com/api/eventos/${id}`);
      obtenerEventos();
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  const buscarEventos = () => {
    const resultados = eventos.filter(evento => 
      (busquedaNombre ? evento.title.toLowerCase().includes(busquedaNombre.toLowerCase()) : true) &&
      (busquedaFecha ? evento.fecha === busquedaFecha : true) &&
      (busquedaDescripcion ? evento.description.toLowerCase().includes(busquedaDescripcion.toLowerCase()) : true)
    );
    setBusquedaResultado(resultados);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/AccesoProductores');
  };

  return (
    <div className="panelAdminEvento">
      <h1>Panel de Administración de Eventos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <h3>Esta funcionando la base de datos, puedes crear eventos, eliminarlos, modificarlos, y buscar por día, descripción o nombre. Estamos trabajando para usted.</h3>
      
      {/* Sección de Búsqueda */}
      <h2>Búsqueda de Eventos</h2>
      <input
        type="text"
        placeholder="Buscar por Nombre"
        value={busquedaNombre}
        onChange={(e) => setBusquedaNombre(e.target.value)}
      />
      <input
        type="date"
        value={busquedaFecha}
        onChange={(e) => setBusquedaFecha(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por Descripción"
        value={busquedaDescripcion}
        onChange={(e) => setBusquedaDescripcion(e.target.value)}
      />
      <button onClick={buscarEventos}>Buscar</button>

      {/* Crear Nuevo Evento */}
      <h2>Crear Nuevo Evento</h2>
      <input
        type="text"
        placeholder="Título"
        value={nuevoEvento.title}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Clasificación"
        value={nuevoEvento.clasificacion}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, clasificacion: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={nuevoEvento.description}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Día"
        value={nuevoEvento.dia}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, dia: e.target.value })}
      />
      <input
        type="date"
        placeholder="Fecha"
        value={nuevoEvento.fecha}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
      />
      <input
        type="time"
        placeholder="Hora"
        value={nuevoEvento.hora}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de Imagen Principal"
        value={nuevoEvento.image}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, image: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de Segunda Imagen (Opcional)"
        value={nuevoEvento.image2}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, image2: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de Imagen Detallada (Opcional)"
        value={nuevoEvento.imageDetail}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, imageDetail: e.target.value })}
      />
      <input
        type="text"
        placeholder="Lugar"
        value={nuevoEvento.lugar}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, lugar: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={nuevoEvento.price}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad de Entradas"
        value={nuevoEvento.quantity}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, quantity: e.target.value })}
      />
      <button onClick={crearEvento}>Crear Evento</button>

      {/* Resultados de la Búsqueda */}
      <h2>Resultados de la Búsqueda</h2>
      <ul>
        {busquedaResultado.map((evento) => (
          <li key={evento._id}>
            {evento.title} - {evento.fecha}
            <button onClick={() => setEditarEvento(evento)}>Editar</button>
            <button onClick={() => eliminarEvento(evento._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Eventos Existentes */}
      <h2>Eventos Existentes</h2>
      <ul>
        {eventos.map((evento) => (
          <li key={evento._id}>
            {evento.title} - {evento.fecha}
            <button onClick={() => setEditarEvento(evento)}>Editar</button>
            <button onClick={() => eliminarEvento(evento._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Editar Evento */}
      {editarEvento && (
        <div>
          <h2>Editar Evento</h2>
          <input
            type="text"
            placeholder="Título"
            value={editarEvento.title}
            onChange={(e) => setEditarEvento({ ...editarEvento, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Clasificación"
            value={editarEvento.clasificacion}
            onChange={(e) => setEditarEvento({ ...editarEvento, clasificacion: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={editarEvento.description}
            onChange={(e) => setEditarEvento({ ...editarEvento, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Día"
            value={editarEvento.dia}
            onChange={(e) => setEditarEvento({ ...editarEvento, dia: e.target.value })}
          />
          <input
            type="date"
            placeholder="Fecha"
            value={editarEvento.fecha}
            onChange={(e) => setEditarEvento({ ...editarEvento, fecha: e.target.value })}
          />
          <input
            type="time"
            placeholder="Hora"
            value={editarEvento.hora}
            onChange={(e) => setEditarEvento({ ...editarEvento, hora: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de Imagen Principal"
            value={editarEvento.image}
            onChange={(e) => setEditarEvento({ ...editarEvento, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de Segunda Imagen (Opcional)"
            value={editarEvento.image2}
            onChange={(e) => setEditarEvento({ ...editarEvento, image2: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de Imagen Detallada (Opcional)"
            value={editarEvento.imageDetail}
            onChange={(e) => setEditarEvento({ ...editarEvento, imageDetail: e.target.value })}
          />
          <input
            type="text"
            placeholder="Lugar"
            value={editarEvento.lugar}
            onChange={(e) => setEditarEvento({ ...editarEvento, lugar: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            value={editarEvento.price}
            onChange={(e) => setEditarEvento({ ...editarEvento, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad de Entradas"
            value={editarEvento.quantity}
            onChange={(e) => setEditarEvento({ ...editarEvento, quantity: e.target.value })}
          />
          <button onClick={() => modificarEvento(editarEvento._id)}>Modificar Evento</button>
          <button onClick={() => setEditarEvento(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default PanelAdminEvento;
