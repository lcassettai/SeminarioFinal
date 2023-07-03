import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/sucursales`;

export const getAllRestaurantes = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(baseUrl, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return await handleResponse(response);
}

export const getRestaurante = async (id) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseUrl+'/'+id}`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    
    return await handleResponse(response);
}

export const getMenu = async (idSucursal) =>{
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}/${idSucursal}/menu`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return await handleResponse(response);
}