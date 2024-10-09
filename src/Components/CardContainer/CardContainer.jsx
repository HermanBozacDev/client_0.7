import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa Axios directamente
import ItemCards from '../ItemCards/ItemCards.jsx';
import '../CardContainer/CardContainer.css';
import Header from '../Header/Header.jsx';

const CardContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función asíncrona que obtiene los productos de la API
  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://tu-api-url/productos'); // Cambia 'http://tu-api-url' por tu URL real
      setProductos(response.data);
    } catch (error) {
      setError("Error fetching productos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los productos cuando el componente se monte
  useEffect(() => {
    fetchProductos(); // Llamamos a la función async dentro de useEffect
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='CardContainer'>
      <Header />
      <div id='ShowsScroll'></div>
      <ItemCards productos={productos} />
    </div>
  );
};

export default CardContainer;
