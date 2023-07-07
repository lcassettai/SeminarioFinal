const pedidosModel = require("../models/pedidosModel");
const mesasModel = require("../models/mesasModel");
const utils = require("../utils");

const nuevoPedido = async (req, res) => {
  const {codigo_habilitacion } = req.params;

  try {
    const mesaValidada = await mesasModel.validarCodigoIngreso(
      codigo_habilitacion
    );

    //Validamos que el codigo de la mesa coincida con el codigo de verificacion
    if (!mesaValidada || mesaValidada.length <= 0) {
      res.status(404).json();
      return;
    }
    
    const mesa = mesaValidada[0];
    const codigoIngreso = utils.generateRandomCode();
    const cliente = req.usuario.id_cliente;

    const pedidoInsertado = await pedidosModel.nuevoPedido(codigoIngreso,cliente,mesa.id_mesa,mesa.id_codigo_habilitacion,mesa.id_sucursal);
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

    pedidosModel.updateEstadoPedido(id_pedido,2);
    res.json({status: "Pedido generado correctamente"});
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Error al cargar el pedido"});
  }
} 

const getPedidoMesaEstadoNuevo = async (req,res) => {
  try {
    const cliente = req.usuario.id_cliente;
    const {id_mesa} = req.params;

    const pedido = await pedidosModel.getPedidoEstadoNuevo(cliente,id_mesa);

    if(!pedido || pedido.length <= 0){
      res.json(null); 
      return;
    }

    res.json(pedido[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error al obtener el pedido"});
  }
}

const getPedidosCliente = async (req,res) => {
  try{
    const cliente = req.usuario.id_cliente;
    const pedidos = await pedidosModel.getPedidosCliente(cliente);
  
    res.json(pedidos);    
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Error al obtener los pedidos"});
  }
}

const getPedidoDetalle = async (req,res) => {
  try {
    const cliente = req.usuario.id_cliente;
    const {id_pedido} = req.params;

    const detalle = await pedidosModel.getPedidoDetalle(id_pedido,cliente);
    
    res.json(detalle);
  } catch (error) {
    console.error(error);    
    res.status(500).json({error: "Error al obtener los pedidos"});
  }
}

const getPedido = async(req,res) => {
  try {
    const {id_pedido} = req.params;

    const pedido = await pedidosModel.getPedido(id_pedido);

    res.json(pedido[0]);
  } catch (error) {
    console.error(error);    
    res.status(500).json({error: "Error al obtener el pedido"});
  }
}

const getPedidosMesaCliente = async (req,res) => {
  try {
    const cliente = req.usuario.id_cliente;
    const {id_codigo_habilitacion} = req.params;

    const pedidosMesa = await pedidosModel.getPedidosMesaCliente(cliente,id_codigo_habilitacion);

    res.json(pedidosMesa);
  } catch (error) {
    console.error(error);    
    res.status(500).json({error: "Error al obtener el pedido"});
  }
}

module.exports = {
  nuevoPedido,
  cargarPedido,
  getPedidoMesaEstadoNuevo,
  getPedidosCliente,
  getPedidoDetalle,
  getPedido,
  getPedidosMesaCliente
};
