import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/horarios`;

export const getHorariosSucursal = async (idSucursal) => {    
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
