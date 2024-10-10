// src/utils/UploadImages.js
import axios from 'axios';

const UploadImages = async (selectedImages, setFeedbackMessage, setNuevoEvento, nuevoEvento) => {
  const { image, image2, imageDetail } = selectedImages;

  if (image && image2 && imageDetail) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('image2', image2);
    formData.append('imageDetail', imageDetail);

    try {
      const response = await axios.post('https://www.imperioticket.com/api/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta de la subida de imágenes:', response.data);

      setFeedbackMessage(response.data.message); // Mostrar mensaje de éxito

      setNuevoEvento({
        ...nuevoEvento,
        image: response.data.filePath1,          // Ruta de la primera imagen
        image2: response.data.filePath2,         // Ruta de la segunda imagen
        imageDetail: response.data.filePathDetail // Ruta de la tercera imagen detallada
      });

      return true; // Indicar que la subida fue exitosa
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      setFeedbackMessage('Error al subir imágenes. Por favor, intenta de nuevo.');
      return false; // Indicar que la subida falló
    }
  } else {
    setFeedbackMessage('Por favor, selecciona las tres imágenes antes de subir.');
    return false; // Indicar que faltan imágenes
  }
};

export default UploadImages;
