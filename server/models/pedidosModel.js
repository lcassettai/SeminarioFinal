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

const nuevoPedido = async (codigoAdecion, idCliente, idMesa) => {
  const resultado = await db.query(
    `
        INSERT INTO pedidos (created_at ,updated_at,codigo_adecion,id_mesa,id_mozo,id_estado,id_cliente_inicial)
        VALUES (now(),now(),$1,$2,null,1,$3) RETURNING id_pedido;
    `,
    [codigoAdecion, idMesa, 1]
  );

  return resultado.rows;
};

const nuevoPedidoIndividual = async (idPedido, idCliente) => {
  const resultado = await db.query(
    `
        INSERT INTO pedidos_individuales (created_at ,updated_at,id_pedido,id_cliente)
        VALUES (now(),now(),$1,$2) RETURNING id_pedido_individual;
    `,
    [idPedido, 1]
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

module.exports = {
  getPedido,
  nuevoPedido,
  nuevoPedidoIndividual,
  cargarDetallePedido
};
