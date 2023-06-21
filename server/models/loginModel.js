const db = require('../services/db');

const login = async (usuario,clave) => {
    const resultado = await db.query("SELECT * FROM personas WHERE usuario = $1 AND clave = $2",[usuario,clave]);
    return resultado.rows;
}

module.exports = {
    login
}