const pedidosModel = require("../models/pedidosModel");
const mesasModel = require("../models/mesasModel");
const utils = require("../utils");

const nuevoPedido = async (req, res) => {
  const { codigo_identificacion, codigo_ingreso } = req.params;

  try {
    const mesa = await mesasModel.validarCodigoIngreso(
      codigo_identificacion,
      codigo_ingreso
    );

    //Validamos que el codigo de la mesa coincida con el codigo de verificacion
    if (!mesa || mesa.length <= 0) {
      res.status(404).json(null);
      return;
    }

    const codigoIngreso = utils.generateRandomCode();
    const usuario = req.usuario.id_usuario;
    
    const pedidoInsertado = await pedidosModel.nuevoPedido(codigoIngreso,usuario,mesa[0].id_mesa);
    await pedidosModel.nuevoPedidoIndividual(pedidoInsertado[0].id_pedido,usuario);

    const pedido = await pedidosModel.getPedido(pedidoInsertado[0].id_pedido);
    res.json(pedido[0]);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar el pedido" });
  }
};

const cargarPedido = async (req,res) => {
  try{
    const pedidosDetalles = req.body;
    const {id_pedido} = req.params;

    pedidosDetalles.forEach(async(pedido) => {
      await pedidosModel.cargarDetallePedido(28,pedido);
    });
    //Verificar que el usuario se encuentre dentro de la tabla pedido individual para este pedido
    
    res.send('ok');
  }catch(error){
    console.log(error);
    res.status(500).json({error: "Error al cargar el pedido"});
  }
} 

module.exports = {
  nuevoPedido,
  cargarPedido
};
