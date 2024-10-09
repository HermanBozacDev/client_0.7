import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios directamente
import Card from '../Card/Card'; // Importa el componente Card

const EventList = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://tu-api-url/eventos'); // Cambia 'http://tu-api-url' por tu URL real
        setEventos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) return <div>Cargando eventos...</div>;
  if (error) return <div>Error al cargar eventos: {error}</div>;

  return (
    <div>
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

export default EventList;
