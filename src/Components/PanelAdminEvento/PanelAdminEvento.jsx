// Importación de dependencias principales
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PanelAdminEvento/PanelAdminEvento.css'; // Importar estilos

// Importación de hooks y utilidades
import UseEventos from './UseEventos/UseEventos';
import DeleteEventos from './DeleteEventos/DeleteEventos';
import CreateEventos from './CreateEventos/CreateEventos';
import UploadImages from './UploadImages/UploadImages';

// Importación de componentes reutilizables
import ActionSelector from './ActionSelector/ActionSelector';
import ImageUpload from './ImageUpload/ImageUpload';
import EventList from './EventList/EventList';
import EventForm from './EventForm/EventForm';
import FeedbackMessage from './FeedbackMessage/FeedbackMessage';
import HeaderPanel from './HeaderPanel/HeaderPanel';

const PanelAdminEvento = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const { eventos, obtenerEventos } = UseEventos(); // Hook personalizado para manejar eventos

  // Estado inicial del formulario para crear un nuevo evento
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

  // Estado para manejo de las imágenes subidas
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImageDetail, setSelectedImageDetail] = useState(null);
  const [imagesUploaded, setImagesUploaded] = useState(false); // Bandera para controlar si las imágenes se subieron correctamente

  // Estado para seleccionar la acción (crear, modificar, eliminar)
  const [accionSeleccionada, setAccionSeleccionada] = useState('');

  // Estado para manejar mensajes de retroalimentación
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Hook personalizado para manejar la creación de un evento
  const { crearEvento } = CreateEventos(
    nuevoEvento,
    setNuevoEvento,
    setSelectedImage1,
    setSelectedImage2,
    setImagesUploaded,
    setFeedbackMessage,
    obtenerEventos
  );

  // Efecto para verificar si el usuario tiene un token de sesión válido
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/AccesoProductores'); // Redirige si no hay token
    } else {
      obtenerEventos(); // Obtiene los eventos si el usuario está autenticado
    }
  }, [navigate]);

  // Maneja el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/AccesoProductores'); // Redirige a la página de acceso
  };

  // Maneja la carga de imágenes
  const handleImageUpload = async () => {
    const selectedImages = { 
      image: selectedImage1, 
      image2: selectedImage2, 
      imageDetail: selectedImageDetail 
    };

    // Llama a la función para subir imágenes y maneja el estado del feedback
    const uploadSuccess = await UploadImages(selectedImages, setFeedbackMessage, setNuevoEvento, nuevoEvento);

    if (uploadSuccess) {
      setImagesUploaded(true); // Marca las imágenes como subidas correctamente
    }
  };

  // Maneja la selección de acción (crear, modificar, eliminar)
  const handleActionSelect = (action) => {
    setAccionSeleccionada(action); // Actualiza la acción seleccionada
    setImagesUploaded(false); // Reinicia la bandera de imágenes subidas
    setSelectedImage1(null); // Reinicia las imágenes seleccionadas
    setSelectedImage2(null);
    setFeedbackMessage(''); // Limpia el mensaje de retroalimentación
  };

  return (
    <div className="panelAdminEvento">
      {/* Componente de cabecera con botón de logout */}
      <HeaderPanel onLogout={handleLogout} />

      {/* Mensaje de feedback para el usuario */}
      <FeedbackMessage message={feedbackMessage} />

      {/* Selector de acciones: crear, modificar, eliminar */}
      <ActionSelector onSelect={handleActionSelect} />

      {/* Formulario de subida de imágenes si la acción seleccionada es "crear" y no se han subido las imágenes */}
      {accionSeleccionada === 'crear' && !imagesUploaded && (
        <ImageUpload
          setSelectedImage1={setSelectedImage1}
          setSelectedImage2={setSelectedImage2}
          setSelectedImageDetail={setSelectedImageDetail}
          handleImageUpload={handleImageUpload}
          selectedImage1={selectedImage1}
          selectedImage2={selectedImage2}
          selectedImageDetail={selectedImageDetail}
        />
      )}

      {/* Formulario de creación de evento si ya se subieron las imágenes */}
      {accionSeleccionada === 'crear' && imagesUploaded && (
        <EventForm 
          nuevoEvento={nuevoEvento} 
          setNuevoEvento={setNuevoEvento} 
          crearEvento={crearEvento} 
        />
      )}

      {/* Listado de eventos con opción de eliminar */}
      <EventList 
        eventos={eventos} 
        onDelete={(id) => DeleteEventos(id, setFeedbackMessage, obtenerEventos)} 
      />
    </div>
  );
};

export default PanelAdminEvento;
