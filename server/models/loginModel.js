const db = require('../services/db');

const login = async (usuario,clave) => {
    const resultado = await db.query(`SELECT * 
            FROM personas p inner join clientes c
            ON p.id_persona = c.id_persona
            WHERE usuario = $1 AND clave = $2 AND bloqueado = false`,[usuario,clave]);
    return resultado.rows;
}

module.exports = {
    login
}