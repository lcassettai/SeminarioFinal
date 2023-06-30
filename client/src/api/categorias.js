const baseUrl = `${process.env.REACT_APP_API_URL}/api/categorias`;

export const getCategoriasSucursal = async (idSucursal) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseUrl}?id_sucursal=${idSucursal}`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response;
}
