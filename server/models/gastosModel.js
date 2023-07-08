const db = require('../services/db');

const getGastosSucursal = async (idSucursal) => {
    const resultado = await db.query(`
        SELECT * FROM public.gastos_adicionales where activo = true AND id_sucursal = $1
        ORDER BY id_gasto ASC 
    `,[idSucursal]);

    return resultado.rows;
}

module.exports = {
    getGastosSucursal
}