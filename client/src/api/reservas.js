import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/reservas`;

export const nuevaReserva = async (idSucursal,datosReserva) => {    
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}/${idSucursal}`, {
        method: "POST", 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(datosReserva)
    });

    return await handleResponse(response);
}

export const getReserva = async (idReserva) => {    
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}}/${idReserva}`, {
        method: "GET", 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return await handleResponse(response);
}


export const getReservasCliente = async () => {    
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}`, {
        method: "GET", 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return await handleResponse(response);
}
