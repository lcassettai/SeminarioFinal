import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/notificaciones`;

export const cargarNotificacion = async (codigoHabilitacion,notificacion) => {
    const token = window.localStorage.getItem("token");
  
    const response = await fetch(`${baseUrl}/${codigoHabilitacion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(notificacion),
    });
  
    return await handleResponse(response);
  };