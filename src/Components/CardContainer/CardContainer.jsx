import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa Axios directamente
import Card from '../Card/Card'; // Asegúrate de importar el componente Card
import '../CardContainer/CardContainer.css';
import Header from '../Header/Header.jsx';

const CardContainer = () => {
  const [eventos, setEventos] = useState([]); // Cambia 'productos' a 'eventos'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función asíncrona que obtiene los eventos de la API
  const fetchEventos = async () => {
    try {
      const response = await axios.get('https://www.imperioticket.com/api/eventos'); // Cambia por tu URL real
      setEventos(response.data);
    } catch (error) {
      setError("Error fetching eventos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los eventos cuando el componente se monte
  useEffect(() => {
    fetchEventos(); // Llamamos a la función async dentro de useEffect
  }, []);

  if (loading) return <div>Cargando eventos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='CardContainer'>
      <Header />
      <div id='ShowsScroll'></div>
      {eventos.map((evento) => (
        <Card
          key={evento._id}
          title={evento.title}
          price={evento.price}
          image={evento.image}
          image2={evento.image2}
          imageDetail={evento.imageDetail}
          dia={evento.dia}
          fecha={evento.fecha}
          hora={evento.hora}
          lugar={evento.lugar}
          description={evento.description}
          clasificacion={evento.clasificacion}
        />
      ))}
    </div>
  );
};

export default CardContainer;
