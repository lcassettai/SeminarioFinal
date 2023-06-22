// Middleware para verificar la validez del token en rutas protegidas
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    req.usuario = decoded.sesionUsuario;
    next();
  });
}


module.exports = {
    verifyToken
}