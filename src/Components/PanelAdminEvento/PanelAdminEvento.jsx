import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../PanelAdminEvento/PanelAdminEvento.css';

const PanelAdminEvento = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState({
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
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState('');
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

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
      setFeedbackMessage('Error al obtener eventos. Intenta de nuevo más tarde.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/AccesoProductores');
  };

  const handleImageUpload = async () => {
    if (selectedImage1 && selectedImage2) {
      const formData = new FormData();
      formData.append('image', selectedImage1);
      formData.append('image2', selectedImage2);

      try {
        const response = await axios.post('https://www.imperioticket.com/api/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setFeedbackMessage(response.data.message);
        setImagesUploaded(true);
      } catch (error) {
        console.error('Error al subir imágenes:', error);
        setFeedbackMessage('Error al subir imágenes. Por favor, intenta de nuevo.');
      }
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (selectedImage1) formData.append('image', selectedImage1);
    if (selectedImage2) formData.append('image2', selectedImage2);

    Object.keys(evento).forEach(key => {
      formData.append(key, evento[key]);
    });

    try {
      const url = eventoSeleccionado ? 
        `https://www.imperioticket.com/api/eventos/${eventoSeleccionado._id}` : 
        'https://www.imperioticket.com/api/eventos';
      const method = eventoSeleccionado ? 'put' : 'post';
      
      await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setEvento({
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
      setSelectedImage1(null);
      setSelectedImage2(null);
      setImagesUploaded(false);
      setFeedbackMessage('Evento ' + (eventoSeleccionado ? 'editado' : 'creado') + ' con éxito.');
      obtenerEventos();
    } catch (error) {
      console.error('Error al crear o editar evento:', error);
      setFeedbackMessage('Error al ' + (eventoSeleccionado ? 'editar' : 'crear') + ' evento. Por favor, intenta de nuevo.');
    }
  };

  const handleActionSelect = (action, evento = null) => {
    setAccionSeleccionada(action);
    setEventoSeleccionado(evento);
    if (evento) {
      setEvento(evento); // Cargar datos en el formulario si se edita
    }
    setImagesUploaded(false);
    setSelectedImage1(null);
    setSelectedImage2(null);
    setFeedbackMessage('');
  };

  return (
    <div className="panelAdminEvento">
      <h1>Panel de Administración de Eventos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <h3>Administración de eventos</h3>

      {/* Mensaje de feedback */}
      {feedbackMessage && <p>{feedbackMessage}</p>}

      {/* Selección de acción */}
      <div>
        <h2>Seleccionar Acción</h2>
        <button onClick={() => handleActionSelect('crear')}>Crear Evento</button>
        <button onClick={() => handleActionSelect('editar')}>Editar Evento</button>
        <button onClick={() => handleActionSelect('eliminar')}>Eliminar Evento</button>
      </div>

      {/* Formulario para subir imágenes y crear/editar evento */}
      {accionSeleccionada && (
        <div>
          <h2>{eventoSeleccionado ? 'Editar Evento' : 'Crear Nuevo Evento'}</h2>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage1(e.target.files[0])}
            />
            {selectedImage1 && <p>Imagen 1 seleccionada: {selectedImage1.name}</p>}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage2(e.target.files[0])}
            />
            {selectedImage2 && <p>Imagen 2 seleccionada: {selectedImage2.name}</p>}
          </div>
          <button onClick={handleImageUpload} disabled={!selectedImage1 || !selectedImage2}>
            Subir Imágenes
          </button>

          {/* Formulario de creación/edición de evento */}
          {imagesUploaded && (
            <form onSubmit={manejarSubmit}>
              <input
                type="text"
                placeholder="Título"
                value={evento.title}
                onChange={(e) => setEvento({ ...evento, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Clasificación"
                value={evento.clasificacion}
                onChange={(e) => setEvento({ ...evento, clasificacion: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Descripción"
                value={evento.description}
                onChange={(e) => setEvento({ ...evento, description: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Día"
                value={evento.dia}
                onChange={(e) => setEvento({ ...evento, dia: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="Fecha"
                value={evento.fecha}
                onChange={(e) => setEvento({ ...evento, fecha: e.target.value })}
                required
              />
              <input
                type="time"
                placeholder="Hora"
                value={evento.hora}
                onChange={(e) => setEvento({ ...evento, hora: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="URL de Imagen Detallada (Opcional)"
                value={evento.imageDetail}
                onChange={(e) => setEvento({ ...evento, imageDetail: e.target.value })}
              />
              <input
                type="text"
                placeholder="Lugar"
                value={evento.lugar}
                onChange={(e) => setEvento({ ...evento, lugar: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={evento.price}
                onChange={(e) => setEvento({ ...evento, price: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Cantidad de Entradas"
                value={evento.quantity}
                onChange={(e) => setEvento({ ...evento, quantity: e.target.value })}
                required
              />
              <button type="submit">{eventoSeleccionado ? 'Actualizar Evento' : 'Crear Evento'}</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PanelAdminEvento;
