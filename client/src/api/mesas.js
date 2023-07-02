import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/mesas`;

export const getMesaByCodigo = async (codigo) => {    
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}?codigo=${codigo}`, {
        method: "GET", 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    return await handleResponse(response);
}
