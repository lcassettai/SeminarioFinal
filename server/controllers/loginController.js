const loginModel = require('../models/loginModel');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const login = async (req,res) => {
    const { usuario, clave } = req.body;

    if(usuario === undefined || clave === undefined){
      res.status(400).json({ error: 'Debe proporcionar las credenciales' });
      return;
    }

    const usuarioLogin =  await loginModel.login(usuario,clave);

    if (usuarioLogin !== undefined && usuarioLogin.length > 0) {
      const token = jwt.sign({ usuario }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
}

module.exports = {
    login
}