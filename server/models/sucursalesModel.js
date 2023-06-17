const db = require("../services/db");

const getAll = async () => {
  const resultado = await db.query(
    `SELECT id_sucursal,
            direccion,
            pro.id AS id_provincia,
            pro.nombre AS nombre_provincia,
            lo.nombre AS nombre_localidad,
            es.nombre AS nombre_establecimiento,
            imagen,
            valoracion
    FROM sucursales su
    INNER JOIN provincias pro ON su.id_provincia = pro.id
    INNER JOIN localidades lo ON lo.id = su.id_localidad
    INNER JOIN establecimientos es ON es.id_establecimiento = su.id_establecimiento`
  );
  return resultado.rows;
};

const get = async (id) => {
  const resultado = await db.query(
    `SELECT id_sucursal,
            direccion,
            pro.id AS id_provincia,
            pro.nombre AS nombre_provincia,
            lo.nombre AS nombre_localidad,
            es.nombre AS nombre_establecimiento,
            imagen,
            valoracion
    FROM sucursales su
    INNER JOIN provincias pro ON su.id_provincia = pro.id
    INNER JOIN localidades lo ON lo.id = su.id_localidad
    INNER JOIN establecimientos es ON es.id_establecimiento = su.id_establecimiento
    where su.id_sucursal = $1`,
    [id]
  );
  return resultado.rows;
};

module.exports = {
  getAll,
  get,
};
