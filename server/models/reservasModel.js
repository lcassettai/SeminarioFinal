const db = require('../services/db');

const getReservas = async (idCliente) => {
    const resultado = await db.query(`
        select id_reserva,fecha,hora,personas,hora_limite,estado,detalle,id_cliente,id_sucursal
        from reservas
        where id_cliente = $1
    `,[idCliente]);

    return resultado.rows;
}

const getReserva = async (idReserva,idCliente) => {
    const resultado = await db.query(`
        select id_reserva,fecha,hora,personas,hora_limite,estado,detalle,id_cliente,id_sucursal
        from reservas
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