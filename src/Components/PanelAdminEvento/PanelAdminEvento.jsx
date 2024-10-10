import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../PanelAdminEvento/PanelAdminEvento.css';
import UseEventos from './UseEventos/UseEventos';
import DeleteEventos from './DeleteEventos/DeleteEventos';
import CreateEventos from './CreateEventos/CreateEventos';
import UploadImages from './UploadImages/UploadImages';


import ActionSelector from './ActionSelector/ActionSelector'; // Importa el componente ActionSelector
import ImageUpload from './ImageUpload/ImageUpload'; 
import EventList from './EventList/EventList'; 
import EventForm from './EventForm/EventForm'; 
import FeedbackMessage from './FeedbackMessage/FeedbackMessage'; 
import HeaderPanel from './HeaderPanel/HeaderPanel'; 

const PanelAdminEvento = () => {
  const navigate = useNavigate();
  const { eventos, obtenerEventos } = UseEventos();
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
  const [selectedImageDetail, setSelectedImageDetail] = useState(null); 
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [accionSeleccionada, setAccionSeleccionada] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  // Llamada correcta a la función de creación de eventos
  const { crearEvento } = CreateEventos(
    nuevoEvento,
    setNuevoEvento,
    setSelectedImage1,
    setSelectedImage2,
    setImagesUploaded,
    setFeedbackMessage,
    obtenerEventos
  );
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/AccesoProductores');
    } else {
      obtenerEventos();
    }
  }, [navigate]);

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/AccesoProductores');
  };

  const handleImageUpload = async () => {
    const selectedImages = { image: selectedImage1, image2: selectedImage2, imageDetail: selectedImageDetail };
    
    // Llamar a la función UploadImages y pasar las funciones de estado necesarias
    const uploadSuccess = await UploadImages(selectedImages, setFeedbackMessage, setNuevoEvento, nuevoEvento);

    if (uploadSuccess) {
      setImagesUploaded(true);
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
      <HeaderPanel onLogout={handleLogout} />
      <FeedbackMessage message={feedbackMessage} />
      <ActionSelector onSelect={handleActionSelect} />
      
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
      
      {accionSeleccionada === 'crear' && imagesUploaded && (
        <EventForm 
          nuevoEvento={nuevoEvento} 
          setNuevoEvento={setNuevoEvento} 
          crearEvento={crearEvento} 
        />
      )}
      
      <EventList eventos={eventos} onDelete={(id) => DeleteEventos(id, setFeedbackMessage, obtenerEventos)} />
    </div>
  );
};

export default PanelAdminEvento;
