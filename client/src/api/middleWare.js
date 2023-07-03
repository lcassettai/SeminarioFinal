export const handleResponse = async (response,returnJson = true) => {
    if(!response.ok){
        if(response.status === 401){
            localStorage.clear();
            window.location.href = '/login';
            throw new Error('Token inválido o expirado');
        }

        if(response.status === 404){
            return null;
        }

        throw new Error('Error en la respuesta de la solicitud');
    }
    
    return returnJson ? response.json() : response;
}
