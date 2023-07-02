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
    
    //Validamos el usuario
    if (!usuarioLogin || usuarioLogin.length <= 0) {
       res.status(401).json({ error: 'Credenciales inválidas' });
       return;
    }

    const sesionUsuario ={
      "id_usuario" : usuarioLogin[0].id_persona,
      "id_cliente": usuarioLogin[0].id_cliente,
      "usuario": usuarioLogin[0].usuario
    }

    const token = jwt.sign({sesionUsuario}, secretKey, { expiresIn: '24h' });
    res.json({ token });    
}

module.exports = {
    login
}