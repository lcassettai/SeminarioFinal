const db = require("../services/db");

const getMesas = async (codigo_identificacion) => {
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
        `, [codigo_identificacion]
  );
  return resultado.rows;
};

const validarCodigoIngreso = async (codigo_identificacion,codigo_ingreso) => {
    const resultado = await db.query(
        `SELECT ID_MESA
            FROM MESAS
            WHERE codigo_ingreso ilike $1 AND CODIGO_IDENTIFICACION ilike $2
        AND ACTIVA = TRUE
    `, [`${codigo_ingreso}`,`${codigo_identificacion}`]
);

return resultado.rows;
}

module.exports = {
    getMesas,
    validarCodigoIngreso
};
