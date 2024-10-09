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
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState('');

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
        setFeedbackMessage(response.data.message); // Mostrar mensaje de éxito
        setImagesUploaded(true);
      } catch (error) {
        console.error('Error al subir imágenes:', error);
        setFeedbackMessage('Error al subir imágenes. Por favor, intenta de nuevo.');
      }
    }
  };

  const crearEvento = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Agregar las imágenes al FormData
    if (selectedImage1) {
      formData.append('image', selectedImage1);
    }
    if (selectedImage2) {
      formData.append('image2', selectedImage2);
    }

    // Agregar los datos del nuevo evento al FormData
    Object.keys(nuevoEvento).forEach(key => {
      formData.append(key, nuevoEvento[key]);
    });

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
      setSelectedImage1(null);
      setSelectedImage2(null);
      setImagesUploaded(false);
      setFeedbackMessage('Evento creado con éxito.');
      obtenerEventos();
    } catch (error) {
      console.error('Error al crear evento:', error);
      setFeedbackMessage('Error al crear evento. Por favor, intenta de nuevo.');
    }
  };

  const handleActionSelect = (action) => {
    setAccionSeleccionada(action);
    setImagesUploaded(false);
    setSelectedImage1(null);
    setSelectedImage2(null);
    setFeedbackMessage(''); // Limpiar mensaje de feedback
  };

  return (
    <div className="panelAdminEvento">
      <h1>Panel de Administración de Eventos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <h3>Esta funcionando la base de datos, puedes crear eventos, eliminarlos, modificarlos, y buscar por día, descripción o nombre. Estamos trabajando para usted.</h3>

      {/* Mensaje de feedback */}
      {feedbackMessage && <p>{feedbackMessage}</p>}

      {/* Selección de acción */}
      <div>
        <h2>Seleccionar Acción</h2>
        <button onClick={() => handleActionSelect('crear')}>Crear Evento</button>
        <button onClick={() => handleActionSelect('eliminar')}>Eliminar Evento</button>
        <button onClick={() => handleActionSelect('editar')}>Editar Evento</button>
      </div>

      {/* Formulario para subir imágenes si la acción es crear */}
      {accionSeleccionada === 'crear' && !imagesUploaded && (
        <div>
          <h2>Subir Imágenes</h2>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedImage1(e.target.files[0]);
              }}
            />
            {selectedImage1 && <p>Imagen 1 seleccionada: {selectedImage1.name}</p>}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedImage2(e.target.files[0]);
              }}
            />
            {selectedImage2 && <p>Imagen 2 seleccionada: {selectedImage2.name}</p>}
          </div>
          <button onClick={handleImageUpload} disabled={!selectedImage1 || !selectedImage2}>
            Subir Imágenes
          </button>
        </div>
      )}

      {/* Formulario para crear un nuevo evento */}
      {accionSeleccionada === 'crear' && imagesUploaded && (
        <form onSubmit={crearEvento}>
          <h2>Crear Nuevo Evento</h2>
          <input
            type="text"
            placeholder="Título"
            value={nuevoEvento.title}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Clasificación"
            value={nuevoEvento.clasificacion}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, clasificacion: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={nuevoEvento.description}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Día"
            value={nuevoEvento.dia}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, dia: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Fecha"
            value={nuevoEvento.fecha}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
            required
          />
          <input
            type="time"
            placeholder="Hora"
            value={nuevoEvento.hora}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora: e.target.value })}
            required
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
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevoEvento.price}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Cantidad de Entradas"
            value={nuevoEvento.quantity}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, quantity: e.target.value })}
            required
          />
          <button type="submit">Crear Evento</button>
        </form>
      )}

      {/* Aquí puedes agregar lógica para eliminar o editar eventos */}
      {accionSeleccionada === 'eliminar' && (
        <div>
          <h2>Eliminar Evento</h2>
          {/* Lógica para eliminar evento aquí */}
        </div>
      )}
      
      {accionSeleccionada === 'editar' && (
        <div>
          <h2>Editar Evento</h2>
          {/* Lógica para editar evento aquí */}
        </div>
      )}
    </div>
  );
};

export default PanelAdminEvento;
