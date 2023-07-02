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
    const cliente = req.usuario.id_cliente;
    
    const pedidoInsertado = await pedidosModel.nuevoPedido(codigoIngreso,cliente,mesa[0].id_mesa);
    await pedidosModel.nuevoPedidoIndividual(pedidoInsertado[0].id_pedido,cliente);

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
    const cliente = req.usuario.id_cliente;
    const {id_pedido} = req.params;

    const pedidoIndividual = await pedidosModel.getPedidoIndividual(id_pedido,cliente);

    if(!pedidoIndividual || pedidoIndividual <= 0){
      res.status(400).json({
        error: "El cliente no esta autorizado a cargar elementos en este pedido"
      });
      return;
    }

    pedidosDetalles.forEach(async(pedido) => {
      await pedidosModel.cargarDetallePedido(pedidoIndividual[0].id_pedido_individual,pedido);
    });
    
    res.json({status: "Pedido generado correctamente"});
  }catch(error){
    console.log(error);
    res.status(500).json({error: "Error al cargar el pedido"});
  }
} 

module.exports = {
  nuevoPedido,
  cargarPedido
};
