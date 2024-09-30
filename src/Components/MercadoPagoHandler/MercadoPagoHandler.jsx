import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from 'axios';

const MercadoPagoHandler = ({ onPreferenceIdReady, count, subTotal, image, title  }) => {
  console.log("necesito rastrear")
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    console.log("Inicializando Mercado Pago...");
    initMercadoPago("APP_USR-a10b7367-f4d9-4fcd-b209-6b498100cf0c", {
      locale: "es-AR",
    });
    console.log("Mercado Pago inicializado.");
  }, []);

 const createPreference = async () => {
  console.log("Creando preferencia...");
  try {
    console.log({ title, count, subTotal, image });
    const response = await axios.post("https://www.imperioticket.com/api/create_preference", {
      items: [{  // Asegúrate de que los datos estén dentro de items
        id: "default_id",
        title: title,
        quantity: count,
        unit_price: subTotal, 
        picture_url: image,
        description: "default_description",
      }],
      back_urls: {
        success: 'https://www.imperioticket.com/api/success',
        failure: 'https://www.imperioticket.com/api/failure',
        pending: 'https://www.imperioticket.com/api/pending'
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [{ id: "visa" }],
        installments: 6
      },
      external_reference: 'mi-referencia-external-12345',
      notification_url: 'https://www.imperioticket.com/api/notifications'
    },
    {
      headers: {
        'Content-Type': 'application/json' ,
        'x-integrator-id': 'dev_24c65fb163bf11ea96500242ac130004',
      }
    });


    console.log("Respuesta del servidor:", response.data);
    const { id } = response.data;
    console.log("ID de la preferencia recibida:", id);
    return id;
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
  }
};



  const handleBuy = async () => {
    console.log("Botón 'Comprar' clicado.");
    const id = await createPreference();

    if (id) {
      console.log("Estableciendo ID de la preferencia en el estado:", id);
      setPreferenceId(id);
      if (onPreferenceIdReady) onPreferenceIdReady(id); // Pasar el ID al componente padre si es necesario
    } else {
      console.warn("No se pudo obtener el ID de la preferencia.");
    }
  };


  return (
    <div>
      <button onClick={handleBuy}>Comprar</button>
      <div id="wallet_container"></div>
      {preferenceId && (<Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default MercadoPagoHandler;
