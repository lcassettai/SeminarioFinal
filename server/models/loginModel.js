const db = require('../services/db');

const login = async (email,clave) => {
    const resultado = await db.query("SELECT * FROM personas WHERE email = $1 AND clave = $2",[email,clave]);
    return resultado.rows;
}

module.exports = {
    login
}