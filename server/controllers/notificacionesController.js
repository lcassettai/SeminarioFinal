const notificacionesModel = require("../models/notificacionesModel");
const mesasModel = require("../models/mesasModel");


const cargarNuevaNotificacion = async (req, res) => {
  try {
    const cliente = req.usuario.id_cliente;
    const {codigo_habilitacion} = req.params;
    const notificacion = req.body;

    const mesaValidada = await mesasModel.validarCodigoIngreso(
        codigo_habilitacion
    );

    //Validamos que el codigo de la mesa coincida con el codigo de verificacion
    if (!mesaValidada || mesaValidada.length <= 0) {
    res.status(404).json();
    return;
    }

    const mesa = mesaValidada[0];
    const resultado = await notificacionesModel.cargarNuevaNotificacion(notificacion,mesa.id_mesa,cliente);

    res.json({notificacion: "Se cargo la notificacion correctamente"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar el pedido" });
  }
};

module.exports = {
  cargarNuevaNotificacion,
};
