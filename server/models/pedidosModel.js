const db = require("../services/db");

const getPedido = async (idPedido) => {
  const resultado = await db.query(
    `SELECT id_pedido,nro_pedido, created_at ,updated_at,codigo_adecion,
        id_mesa,id_mozo,id_estado,id_cliente_inicial
      FROM pedidos 
      WHERE id_pedido = $1`,
    [idPedido]
  );

  return resultado.rows;
};

const getPedidoIndividual = async (idPedido,idCliente) => {
    const resultado = await db.query(`
      select * 
      from pedidos_individuales
      where id_pedido = $1 AND id_cliente = $2
    `,[idPedido,idCliente]);

    return resultado.rows;
}

const getPedidoEstadoNuevo = async (idCliente,idMesa) => {
  const result = await db.query(`
    SELECT p.id_pedido,nro_pedido,p.created_at,codigo_adecion,id_mozo,id_estado,id_cliente_inicial
    FROM PEDIDOS P
    INNER JOIN PEDIDOS_INDIVIDUALES PI ON P.ID_PEDIDO = PI.ID_PEDIDO
    INNER JOIN MESAS M ON M.ID_MESA = P.ID_MESA
    WHERE P.ID_ESTADO = 1 
      AND PI.ID_CLIENTE = $1
      AND P.ID_MESA = $2
  `,[idCliente,idMesa]);

  return result.rows;
}

const nuevoPedido = async (codigoAdecion, idCliente, idMesa) => {
  const resultado = await db.query(
    `
        INSERT INTO pedidos (created_at ,updated_at,codigo_adecion,id_mesa,id_mozo,id_estado,id_cliente_inicial)
        VALUES (now(),now(),$1,$2,null,1,$3) RETURNING id_pedido;
    `,
    [codigoAdecion, idMesa, idCliente]
  );

  return resultado.rows;
};

const nuevoPedidoIndividual = async (idPedido, idCliente) => {
  const resultado = await db.query(
    `
        INSERT INTO pedidos_individuales (created_at ,updated_at,id_pedido,id_cliente)
        VALUES (now(),now(),$1,$2) RETURNING id_pedido_individual;
    `,
    [idPedido, idCliente]
  );

  return resultado.rows;
};

const cargarDetallePedido = async (id_pedido_individual, pedido) => {

  const resultado = await db.query(
    `
    INSERT INTO pedidos_detalle(cantidad,costo,detalle,created_at,id_producto,id_pedido_individual)
    VALUES($1,$2,'',now(),$3,$4) ;
    `,
    [pedido.cantidad,pedido.precio,pedido.id,id_pedido_individual]
  );

  return resultado.rows;
};

const updateEstadoPedido = async (pedido, estado) => {

  const resultado = await db.query(
    `
    UPDATE pedidos
    SET id_estado = $1
    WHERE id_pedido = $2
    `,
    [estado,pedido]
  );

  return resultado.rows;
};

module.exports = {
  getPedido,
  nuevoPedido,
  nuevoPedidoIndividual,
  cargarDetallePedido,
  getPedidoIndividual,
  getPedidoEstadoNuevo,
  updateEstadoPedido
};
