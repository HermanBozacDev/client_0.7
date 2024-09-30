import React from 'react';
import Button from '../Button/Button'; // Importamos el componente del botón
import '../Card/Card.css'; // Importamos los estilos
import { Link } from 'react-router-dom';


const Card = ({ title, price, image, id }) => {
  return (
    <div className="card">

      <img src={image} alt='foto Banda' className='fotoBanda' />
      <h2 className='titulo'>{title}</h2>
      <p className='titulo'>Precio: ${price}</p>
      <Link to={`/CardDetail`}  state={{ image, title, price, }}  className='buy-button'>Comprar</Link>

    </div>
  );
};

export default Card;