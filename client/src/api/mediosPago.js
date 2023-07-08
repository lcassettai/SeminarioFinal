import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/medios_pago`;

export const getMediosPagoSucursal = async (idSucursal) => {    
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}/${idSucursal}`, {
        method: "GET", 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    return await handleResponse(response);
}
