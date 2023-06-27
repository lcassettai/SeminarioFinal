const baseUrl = `${process.env.REACT_APP_API_URL}/api/categorias`;
const token = localStorage.getItem('token');

export const getCategoriasSucursal = async (idSucursal) => {
    const response = await fetch(`${baseUrl}?id_sucursal=${idSucursal}`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response;
}
