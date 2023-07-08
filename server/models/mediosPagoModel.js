const db = require('../services/db');

const getMediosPagoSucursal = async (idSucursal) => {
    const result = await db.query(`
            SELECT MP.ID_MEDIO_PAGO,
                MP.MEDIO,
                MPS.ID_SUCURSAL
            FROM MEDIOS_PAGOS MP
            INNER JOIN MEDIOS_PAGOS_SUCURSAL MPS ON MP.ID_MEDIO_PAGO = MPS.ID_MEDIO_PAGO
            WHERE MPS.ID_SUCURSAL = $1
                AND ACTIVO = TRUE
    `,[idSucursal]);

    return result.rows;
}

module.exports = {
    getMediosPagoSucursal
}