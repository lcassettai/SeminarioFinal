const db = require('../services/db');

const getReservas = async (idCliente) => {
    const resultado = await db.query(`
        SELECT ID_RESERVA,
            FECHA,
            HORA,
            ESTADO,
            ID_CLIENTE,
            R.ID_SUCURSAL,
            E.NOMBRE,
            S.DIRECCION
        FROM RESERVAS R
        INNER JOIN SUCURSALES S ON R.ID_SUCURSAL = S.ID_SUCURSAL
        INNER JOIN ESTABLECIMIENTOS E ON S.ID_ESTABLECIMIENTO = E.ID_ESTABLECIMIENTO
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
            ESTADO,
            DETALLE,
            ID_CLIENTE,
            R.ID_SUCURSAL,
            e.NOMBRE,
            s.direccion
        FROM RESERVAS R
        INNER JOIN SUCURSALES S ON R.ID_SUCURSAL = S.ID_SUCURSAL
        INNER JOIN establecimientos e on s.id_establecimiento = e.id_establecimiento
        where id_reserva = $1 AND id_cliente = $2
    `,[idReserva,idCliente]);

    return resultado.rows;
}

const nuevaReserva = async (idSucursal,idCliente,datosReserva) => {
    const resultado = await db.query(`
        INSERT INTO reservas (fecha,hora,personas,estado,detalle,id_cliente,id_sucursal)
        VALUES($1,$2,$3,'1',$4,$5,$6) RETURNING id_reserva
    `,[datosReserva.fecha,datosReserva.hora,datosReserva.personas,datosReserva.detalle,idCliente,idSucursal]);

    return resultado.rows;
}


module.exports = { 
    getReserva,
    getReservas,
    nuevaReserva
}