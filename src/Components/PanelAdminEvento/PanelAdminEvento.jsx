import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import '../PanelAdminEvento/PanelAdminEvento.css'; // Importamos los estilos


const PanelAdminEvento = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({ nombre: '', fecha: '', descripcion: '' });
  const [editarEvento, setEditarEvento] = useState(null);
  
  // Estados para las búsquedas
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaFecha, setBusquedaFecha] = useState('');
  const [busquedaDescripcion, setBusquedaDescripcion] = useState('');
  const [busquedaResultado, setBusquedaResultado] = useState([]);

  useEffect(() => {
    // Verificar si el token está en localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al usuario a la página de AccesoProductores
      navigate('/AccesoProductores');
    } else {
      // Si hay token, obtener eventos
      obtenerEventos();
    }
  }, [navigate]);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get('https://www.imperioticket.com/api/eventos'); // Ajusta la URL según tu configuración
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const crearEvento = async () => {
    try {
      await axios.post('https://www.imperioticket.com/api/eventos', nuevoEvento);
      setNuevoEvento({ nombre: '', fecha: '', descripcion: '' }); // Limpiar el formulario
      obtenerEventos(); // Volver a obtener la lista de eventos
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  const modificarEvento = async (id) => {
    try {
      await axios.put(`https://www.imperioticket.com/api/eventos/${id}`, editarEvento);
      setEditarEvento(null); // Limpiar el estado de edición
      obtenerEventos(); // Volver a obtener la lista de eventos
    } catch (error) {
      console.error('Error al modificar evento:', error);
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await axios.delete(`https://www.imperioticket.com/api/eventos/${id}`);
      obtenerEventos(); // Volver a obtener la lista de eventos
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  const buscarEventos = () => {
    const resultados = eventos.filter(evento => 
      (busquedaNombre ? evento.nombre.includes(busquedaNombre) : true) &&
      (busquedaFecha ? evento.fecha === busquedaFecha : true) &&
      (busquedaDescripcion ? evento.descripcion.includes(busquedaDescripcion) : true)
    );
    setBusquedaResultado(resultados);
  };

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de login
    navigate('/AccesoProductores');
  };

  return (
    <div className="panelAdminEvento">
      <h1>Panel de Administración de Eventos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button> {/* Botón para cerrar sesión */}
      <h3>esta funcionando la base de datos, podes crear eventos, eliminarlos modificarlos, y buscar por dia descripcion o nombre. estamos trabajando para usted</h3>
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
        placeholder="Nombre"
        value={nuevoEvento.nombre}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })}
      />
      <input
        type="date"
        value={nuevoEvento.fecha}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
      />
      <textarea
        placeholder="Descripción"
        value={nuevoEvento.descripcion}
        onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
      ></textarea>
      <button onClick={crearEvento}>Crear Evento</button>
      <h2>Resultados de la Búsqueda</h2>
      <ul>
        {busquedaResultado.map((evento) => (
          <li key={evento._id}>
            {evento.nombre} - {evento.fecha}
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
            {evento.nombre} - {evento.fecha}
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
            placeholder="Nombre"
            value={editarEvento.nombre}
            onChange={(e) => setEditarEvento({ ...editarEvento, nombre: e.target.value })}
          />
          <input
            type="date"
            value={editarEvento.fecha}
            onChange={(e) => setEditarEvento({ ...editarEvento, fecha: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            value={editarEvento.descripcion}
            onChange={(e) => setEditarEvento({ ...editarEvento, descripcion: e.target.value })}
          ></textarea>
          <button onClick={() => modificarEvento(editarEvento._id)}>Modificar Evento</button>
          <button onClick={() => setEditarEvento(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default PanelAdminEvento;
