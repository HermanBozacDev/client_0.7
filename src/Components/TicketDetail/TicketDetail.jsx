// EventDetail.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Ticket from '../Ticket/Ticket.jsx'; // Ajusta la ruta según la ubicación de tu archivo




const TicketDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qrCode = queryParams.get('qrCode'); // Extrae el QR de los parámetros de consulta

  const eventInfo = {
    title: 'Concierto de Rock',
    date: '25 de Octubre 2024',
    time: '19:00',
    location: 'Estadio Principal',
    attendee: 'Juan Pérez'
  };



  return (
    <div>
      <h1>Detalles del Ticket</h1>
      <Ticket eventInfo={eventInfo} qrCode={qrCode} />
    </div>
  );
};

export default TicketDetail;
