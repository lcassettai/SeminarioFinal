const baseUrl =  `${process.env.REACT_APP_API_URL}/api/pedidos`;
const token =  localStorage.getItem('token');
const mesa =  localStorage.getItem('mesa');

export const iniciarPedidoNuevo = async (codigoVerificacion) => {
    if(mesa == null || mesa == undefined || mesa == ''){
        return null;
    }
    
    const response = fetch(`${baseUrl}/nuevo/${mesa}/${codigoVerificacion}`, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response;
}