const db = require("../services/db");

const getMesas = async (codigo_identificacion) => {
  const resultado = await db.query(
            `SELECT ID_MESA,
                DESCRIPCION,
                ACTIVA,
                UBICACION,
                NUMERO,
                CODIGO_IDENTIFICACION,
                ID_SUCURSAL
            FROM MESAS
            WHERE CODIGO_IDENTIFICACION = $1
        AND ACTIVA = TRUE
        `, [codigo_identificacion]
  );
  return resultado.rows;
};

const validarCodigoIngreso = async (codigo_habilitacion) => {
    const resultado = await db.query(
        `SELECT *
        FROM CODIGO_MESA_HABILITACION CMH
        INNER JOIN MESAS M ON CMH.ID_MESA = M.ID_MESA
        WHERE CMH.CODIGO ilike $1
            AND CMH.ACTIVO = TRUE
            AND M.ACTIVA = TRUE
    `, [`${codigo_habilitacion}`]
);

return resultado.rows;
}

module.exports = {
    getMesas,
    validarCodigoIngreso
};
