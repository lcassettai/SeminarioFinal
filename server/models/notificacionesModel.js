const db = require('../services/db');

const cargarNuevaNotificacion = async (notificacion,idMesa,idCliente) => {
    const result = await db.query(`
    INSERT INTO notificaciones (id_tipo_notificacion,detalle,id_mesa,id_cliente,fecha_hora) 
    VALUES ($1,$2,$3,$4,now());
    `,[notificacion.id_tipo,notificacion.detalle,idMesa,idCliente]);

    return result.rows;
}

module.exports = {
    cargarNuevaNotificacion
}