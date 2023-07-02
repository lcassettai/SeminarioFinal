export const handleResponse = async (response) => {
    if(!response.ok){
        if(response.status === 401){
            localStorage.clear();
            window.location.href = '/login';
            throw new Error('Token inválido o expirado');
            return;
        }
        throw new Error('Error en la respuesta de la solicitud');
    }

    return response.json();
}
