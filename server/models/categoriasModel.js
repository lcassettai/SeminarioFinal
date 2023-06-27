const db = require('../services/db');

const getCategoriasSucursal = async (idSucursal) => {
    const resultado = await db.query(`
    SELECT distinct CP.ID_CATEGORIA,
        CP.CATEGORIA
    FROM PRODUCTOS P
    INNER JOIN CATEGORIAS_PRODUCTOS CP ON P.ID_CATEGORIA = CP.ID_CATEGORIA
    INNER JOIN SUCURSALES S ON S.ID_SUCURSAL = P.ID_SUCURSAL
    WHERE s.id_sucursal = $1;
    `,[idSucursal]);

    return resultado.rows;
}

module.exports = {
    getCategoriasSucursal
}