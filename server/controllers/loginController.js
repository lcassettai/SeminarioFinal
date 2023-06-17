const loginModel = require('../models/loginModel');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const login = async (req,res) => {
    const { email, clave } = req.body;

    if(email === undefined || clave === undefined){
      res.status(400).json({ error: 'Debe proporcionar las credenciales' });
      return;
    }

    const usuario =  await loginModel.login(email,clave);

    if (usuario !== undefined && usuario.length > 0) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
}

module.exports = {
    login
}