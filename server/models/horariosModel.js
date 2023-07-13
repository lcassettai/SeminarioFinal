const db = require('../services/db');

const getHorariosSucursal = async (idSucursal) => {
    const resultado = await db.query(`
    SELECT ID_HORARIO,
        ID_DIA,
        DIA,
        HORA_INICIO,
        HORA_FIN
    FROM HORARIOS H
    INNER JOIN DIAS_SEMANA D ON H.ID_DIA_SEMANA = D.ID_DIA
    WHERE H.ID_SUCURSAL = $1
    ORDER BY ID_DIA,
        HORA_INICIO;
    `,[idSucursal]);

    return resultado.rows;
}

module.exports = {
    getHorariosSucursal
}