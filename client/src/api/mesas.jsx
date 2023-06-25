const baseUrl = `${process.env.REACT_APP_API_URL}/api/mesas`;
const token = localStorage.getItem('token');

export const getMesaByCodigo = async (codigo) => {    

    const response = await fetch(`${baseUrl}?codigo=${codigo}`, {
        method: "GET", 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    return response;
}
