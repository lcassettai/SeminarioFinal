const db = require("../services/db");

const getMesas = async (codigo) => {
  const resultado = await db.query(
            `SELECT ID_MESA,
                DESCRIPCION,
                ACTIVA,
                UBICACION,
                NUMERO,
                CODIGO_IDENTIFICACION,
                CODIGO_INGRESO,
                ID_SUCURSAL
            FROM MESAS
            WHERE CODIGO_IDENTIFICACION = $1
        AND ACTIVA = TRUE
        `, [codigo]
  );
  return resultado.rows;
};

module.exports = {
    getMesas,
};
