const db = require('../services/db');

const getAll = async () => {
  const resultado = await db.query("SELECT id,nombre FROM provincias");;
  return resultado.rows;
}

const get = async (id) => {
  const resultados = await db.query(`SELECT id, nombre FROM provincias where id = $1`, [id]);
  return resultados.rows[0];
}

module.exports = {
  getAll,
  get
}