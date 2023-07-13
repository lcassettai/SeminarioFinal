const db = require('../services/db');

const getReservas = async (idCliente) => {
    const resultado = await db.query(`
        SELECT ID_RESERVA,
            FECHA,
            HORA,
            ESTADO,
            ID_CLIENTE,
            ER.ID_ESTADO_RESERVA,
            R.ID_SUCURSAL,
            E.NOMBRE,
            S.DIRECCION
        FROM RESERVAS R
        INNER JOIN SUCURSALES S ON R.ID_SUCURSAL = S.ID_SUCURSAL
        INNER JOIN ESTABLECIMIENTOS E ON S.ID_ESTABLECIMIENTO = E.ID_ESTABLECIMIENTO
        INNER JOIN ESTADOS_RESERVAS ER ON ER.ID_ESTADO_RESERVA = R.ID_ESTADO_RESERVA
        where id_cliente = $1
    `,[idCliente]);

    return resultado.rows;
}

const getReserva = async (idReserva,idCliente) => {
    const resultado = await db.query(`
        SELECT ID_RESERVA,
            FECHA,
            HORA,
            PERSONAS,
            HORA_LIMITE,
            ER.ID_ESTADO_RESERVA,
            ESTADO,
            DETALLE,
            ID_CLIENTE,
            R.ID_SUCURSAL,
            E.NOMBRE,
            S.DIRECCION
        FROM RESERVAS R
        INNER JOIN SUCURSALES S ON R.ID_SUCURSAL = S.ID_SUCURSAL
        INNER JOIN ESTABLECIMIENTOS E ON S.ID_ESTABLECIMIENTO = E.ID_ESTABLECIMIENTO
        INNER JOIN ESTADOS_RESERVAS ER ON ER.ID_ESTADO_RESERVA = R.ID_ESTADO_RESERVA
        where id_reserva = $1 AND id_cliente = $2
    `,[idReserva,idCliente]);

    return resultado.rows;
}

const nuevaReserva = async (idSucursal,idCliente,datosReserva) => {
    const resultado = await db.query(`
        INSERT INTO reservas (fecha,hora,personas,id_estado_reserva,detalle,id_cliente,id_sucursal)
        VALUES($1,$2,$3,1,$4,$5,$6) RETURNING id_reserva
    `,[datosReserva.fecha,datosReserva.hora,datosReserva.personas,datosReserva.detalle,idCliente,idSucursal]);

    return resultado.rows;
}

const actualizarEstado = async (idReserva,idCliente,estado) => {
    const resultado = await db.query(`
        UPDATE reservas
        SET id_estado_reserva = $3
        WHERE id_reserva = $1 AND id_cliente = $2
    `,[idReserva,idCliente,estado]);

    return resultado.rowCount;
}


module.exports = { 
    getReserva,
    getReservas,
    nuevaReserva,
    actualizarEstado
}