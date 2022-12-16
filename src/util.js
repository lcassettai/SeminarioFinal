const filtrarRestaurantesPorCodigo = (restaurantes,codigo) => {
    return restaurantes.filter((restaurante) => {
        let encontrado = false;
        restaurante.mesas.forEach((mesa) => {
            if(mesa.codigo.toUpperCase() === codigo.toUpperCase()){
              encontrado = true;
            }
        });
      
       if(encontrado === true){
           return restaurante;
       }
    });
}

export {filtrarRestaurantesPorCodigo};