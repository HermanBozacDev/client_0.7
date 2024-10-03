import React, { useState, useEffect } from 'react';
import EntradasCount from '../EntradasCount/EntradasCount'
import { useLocation, Navigate } from 'react-router-dom';
import '../CardDetail/CardDetail.css'
import Button from '../Button/Button'; // Importamos el componente del botón
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import axios from "axios"; // Importar axios para hacer solicitudes HTTP
import MercadoPagoHandler from '../MercadoPago/MercadoPagoHandler/MercadoPagoHandler';

const CardDetail = () => {

  const location = useLocation();
  // Verificación para evitar errores
  if (!location.state) {
    // Puedes redirigir o mostrar un mensaje de error
    return <Navigate to="/" />; // Redirige a la página principal
  }

  const { image, title, price } = location.state;
  console.log({ image, title, price })

  /* contador */
  const [count, setCount] = useState(1); // Contador de entradas
  const [total, setTotal] = useState(0); // Estado para el total
  const [subTotal, setSubTotal] = useState(0); // Estado para el subtotal

  const increment = () => {
      if(count > 0) {
          setCount(count+1)
      }
  }

  const decrement = () => {
      if(count > 1) {
          setCount(count-1)
      }
  }
    // Cálculo del total cada vez que cambian price o count
  useEffect(() => {
    const serviceCharge = price * 0.12;
    const newTotal = (price + serviceCharge) * count;
    setTotal(newTotal); // Actualizamos el total
  }, [price, count]);

  // Cálculo del total cada vez que cambian price o count
  useEffect(() => {
    const serviceCharge = price * 0.12 ;
    const newSubTotal = (price + serviceCharge) * count ;
    setSubTotal(newSubTotal); // Actualizamos el total
  }, [price, count]);

  // Definimos los estados para manejar los correos electrónicos
  const [email, setEmail] = useState(''); // Almacena el primer correo
  const [confirmEmail, setConfirmEmail] = useState(''); // Almacena la confirmación del correo
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Controla si el botón "Comprar Entrada" está habilitado o no
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error si los correos no coinciden

  // Función para validar si los correos coinciden
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validarCorreos(e.target.value, confirmEmail);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
    validarCorreos(email, e.target.value);
  };
    // Función para validar si los correos son iguales y habilitar/deshabilitar el botón
  const validarCorreos = (email1, email2) => {
    if (email1 === email2 && email1 !== '') {
      setIsButtonDisabled(false); // Habilitamos el botón si los correos coinciden y no están vacíos
      setErrorMessage(''); // Limpiamos cualquier mensaje de error
    } else {
      setIsButtonDisabled(true); // Deshabilitamos el botón si no coinciden
      setErrorMessage('Los correos electrónicos no coinciden.'); // Mostramos un mensaje de error
    }
  };



  // Función que se ejecutará al hacer clic en "Comprar Entrada"
  const handleSubmit = () => {
    alert('¡Compra iniciada! Procediendo al pago...');
    // Aquí iría la lógica para conectar con la API del servicio de pagos
  };

  const handleFeedback = async () => {
    try {
      // Realizar la solicitud GET al servidor (suponiendo que está en localhost:3000)
      const response = await axios.get('http://147.79.107.178:3000/feedback');
      console.log('Respuesta del servidor:', response.data); // Manejar la respuesta
      alert('¡Solicitud exitosa! Respuesta del servidor: ' + response.data.message);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      alert('Hubo un error al hacer la solicitud');
    }
  };


  return (
    <div className='DetailContainer'>

      <div className='rowDetail'>

      <MercadoPagoHandler
        count={count}
        subTotal={subTotal}
        image={image}
        title={title}

      />
        <div className='imagenDetailContainer'>
          <img className='imgDetail' src={image} alt="" />
        </div>

        <div className='descripcionContainer'>
          <div className='textoDetail'>
            <h2>{title}</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, similique veniam! Voluptates!</p>
          </div>


          <div className='precioCountDiv'>

            <p>Precio por Entrada: ${price}</p>
            <p>Cargos por Servicio (12%): ${price * 0.12 } </p>
            <EntradasCount count={count} increment={increment} decrement={decrement} />
            <p>Total: ${total}</p>

          </div>

        </div>

      </div>

      {/* Sección de formulario para ingresar y confirmar el correo */}
      <div className='emailFormContainer'>
        <h3>Ingresa el Correo Electrónico, donde quieres recibir tus entradas:</h3>
                <form className='formContainer'>
          {/* Campo para el primer correo */}
          <div className='formGroup'>
            <label >Ingresa tu Email:</label>
            <input
              className='imput'
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          {/* Campo para la confirmación del correo */}
          <div className='formGroup'>
            <label>Confirma tu Email:</label>
            <input
              className='imput'
              type="email"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              placeholder="Confirma tu correo electrónico"
              required
            />
          </div>

          {/* Mensaje de error si los correos no coinciden */}
          {errorMessage && <p className='errorMessage' style={{ color: 'red' }}>{errorMessage}</p>}

           {/* Aquí reemplazamos el botón original por el componente Button */}


        </form>
      </div>




    </div>

  )
}

export default CardDetail


