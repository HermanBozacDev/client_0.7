
// src/DeleteEventos.js
import axios from 'axios';

const API_URL = 'https://www.imperioticket.com/api/eventos'; // Base URL para tu API

const DeleteEventos = async (id, setFeedbackMessage, obtenerEventos) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    setFeedbackMessage('Evento eliminado con éxito.');
    obtenerEventos(); // Recargar eventos después de eliminar
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    setFeedbackMessage('Error al eliminar el evento. Por favor, intenta de nuevo.');
  }
};
export default DeleteEventos
