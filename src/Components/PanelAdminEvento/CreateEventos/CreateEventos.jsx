import axios from 'axios';

const CreateEventos = (
  nuevoEvento,
  setNuevoEvento,
  setSelectedImage1,
  setSelectedImage2,
  setImagesUploaded,
  setFeedbackMessage,
  obtenerEventos
) => {
  const crearEvento = async (e) => {
    e.preventDefault();
    const { title, clasificacion, description, dia, fecha, hora, image, image2, imageDetail, lugar, price, quantity } = nuevoEvento;
    if (!title || !clasificacion || !description || !dia || !fecha || !hora || !image || !image2 || !imageDetail || !lugar || !price || !quantity) {
      setFeedbackMessage('Por favor, completa todos los campos requeridos.');
      return;
    }

    try {
      await axios.post('https://www.imperioticket.com/api/eventos', nuevoEvento, {
        headers: {
          'Content-Type': 'application/json'
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

  return { crearEvento };
};

export default CreateEventos;
