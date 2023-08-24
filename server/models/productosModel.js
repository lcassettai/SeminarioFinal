const db = require("../services/db");

const getAllProductosSucursal = async (idSucursal) => {
  const resultado = await db.query(`SELECT ID_PRODUCTO,
                                        P.DESCRIPCION,
                                        DETALLE,
                                        PRECIO,
                                        P.IMAGEN,
                                        ID_CATEGORIA,
                                        CANTIDAD_COMEN,
                                        P.VALORACION
                                    FROM PRODUCTOS P
                                    INNER JOIN CARTAS C ON P.ID_CARTA = C.ID_CARTA
                                    INNER JOIN SUCURSALES S ON P.ID_SUCURSAL = S.ID_SUCURSAL
                                    WHERE S.ID_SUCURSAL = $1
                                        AND P.ACTIVO = TRUE
                                    ORDER BY ID_CATEGORIA,P.DESCRIPCION`,[idSucursal]);
  return resultado.rows;
};

module.exports = {
    getAllProductosSucursal
};
