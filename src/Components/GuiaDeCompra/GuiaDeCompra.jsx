import { useEffect } from 'react';
import '../GuiaDeCompra/GuiaDeCompra.css';

export const GuiaDeCompra = () => {

   // Este useEffect asegura que la página se desplace hacia arriba al cargar el componente, me encanto!!
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // El array vacío indica que se ejecutará solo al montar el componente

  return (
    <div className='guiaDeCompraContainer'>

      {/* Enlaces de navegación */}
      <h2 className='tituloInformacionGuia'>
        <a href="#guiaDeCompra">Guía de Compra</a> - 
        <a href="#metodosDePago">Métodos de Pago</a><br /> 
        <a href="#preguntasFrecuentes">Preguntas Frecuentes</a>
      </h2>
      <h3 id="guiaDeCompra" className='tituloInformacionAdministrativa'>Guía de compra</h3>

      <p className='desarrollo'>Has clic en el botón "Más Información" y una vez en la ficha descriptiva, selecciona la cantidad de entradas que deseas adquirir.</p>
      <p className='desarrollo'>Has clic en el botón "Ingresar E-mail", y completa tu dirección de e-mail. Por favor, confírmala.</p>
      <p className='desarrollo'>-A esa dirección de correo electrónico, recibirás las entradas que estás comprando para el evento, tan pronto como ingrese la confirmación del pago.</p>
      <p className='desarrollo'>Has clic en el botón "Comprar Entradas"</p>
      <p className='desarrollo'>Has clic en el botón de Compra de Mercado Pago para acceder a tu cuenta, y finalizar el pago desde allí.</p>
      <p className='desarrollo'>Tan pronto como terminas la operación, serás redirigido a nuestra página, y recibirás el e-mail con tus entradas.</p>
      <p className='desarrollo'>Las entradas que enviamos a tu e-mail, son generadas exclusivamente para ti. El código que las identifica, es único en cada caso.</p>
      

      <h3 id="metodosDePago" className='tituloInformacionAdministrativa'>Métodos de Pago</h3>

      <p className='desarrollo'>Trabajamos conectando con la plataforma de Mercado-Pago.</p>

      <h3 id="preguntasFrecuentes" className='tituloInformacionAdministrativa'>Preguntas Frecuentes</h3>
      <p className='desarrollo'>Comprando varias entradas, las recibiré como entradas individuales en mi e-mail?</p>
      <p className='desarrollo'>Llegarán al e-mail ingresado, la cantidad de entradas correspondientes a la compra, cada una con su código individual de autenticación.</p>
      <p className='desarrollo'>Cada QR tiene una clave única y es lo que garantiza tu acceso  al evento.</p>

      
    </div>
  )
}


export default GuiaDeCompra;
