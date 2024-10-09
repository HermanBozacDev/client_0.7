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
  
  // Estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(null);

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


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/AccesoProductores');
  };
  const crearEvento = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    const formData = new FormData();
    
    // Agregar los datos del nuevo evento al FormData
    Object.keys(nuevoEvento).forEach(key => {
      formData.append(key, nuevoEvento[key]);
    });

    // Si se ha seleccionado una imagen, agregarla al FormData
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await axios.post('https://www.imperioticket.com/api/eventos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
      });
      setSelectedImage(null); // Limpiar la imagen seleccionada
      obtenerEventos();
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  // ... (el resto de tu código permanece igual)

  return (
    <div className="panelAdminEvento">
      <h1>Panel de Administración de Eventos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <h3>Esta funcionando la base de datos, puedes crear eventos, eliminarlos, modificarlos, y buscar por día, descripción o nombre. Estamos trabajando para usted.</h3>
      
      {/* Sección de Búsqueda */}
      {/* ... (código de búsqueda) */}

      {/* Crear Nuevo Evento */}
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={crearEvento}>
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
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])} // Capturar el archivo seleccionado
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
        <button type="submit">Crear Evento</button>
      </form>

      {/* Resultados de la Búsqueda */}
      {/* ... (código para mostrar resultados) */}

      {/* Eventos Existentes */}
      {/* ... (código para mostrar eventos existentes) */}

      {/* Editar Evento */}
      {/* ... (código para editar eventos) */}
    </div>
  );
};

export default PanelAdminEvento;
