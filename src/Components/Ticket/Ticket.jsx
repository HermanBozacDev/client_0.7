import React from 'react';
import './Ticket.css';

const Ticket = ({ eventInfo, qrCode }) => {
  return (
    <div className="ticket-container">
      <div className="ticket-info">
        <h2>{eventInfo.title}</h2>
        <p><strong>Fecha:</strong> {eventInfo.date}</p>
        <p><strong>Hora:</strong> {eventInfo.time}</p>
        <p><strong>Lugar:</strong> {eventInfo.location}</p>
        <p><strong>Asistente:</strong> {eventInfo.attendee}</p>
      </div>
      <div className="ticket-qr">
        <img src={qrCode} alt="Código QR" />
      </div>
    </div>
  );
};

export default Ticket;

