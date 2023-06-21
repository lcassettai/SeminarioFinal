const baseUrl = `${process.env.REACT_APP_API_URL}/api/sucursales`;
const token = localStorage.getItem('token');

export const getAllRestaurantes = async () => {
    const response = await fetch(baseUrl, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response;
}

export const getRestaurante = async (id) => {
    const response = await fetch(`${baseUrl+'/'+id}`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    
    return response;
}

