// UseEventos.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const UseEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const obtenerEventos = async () => {
    try {
      const response = await axios.get('https://www.imperioticket.com/api/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      setFeedbackMessage('Error al obtener eventos. Intenta de nuevo más tarde.');
    }
  };

  useEffect(() => {
    obtenerEventos();
  }, []);

  return { eventos, feedbackMessage, obtenerEventos };
};

export default UseEventos;
