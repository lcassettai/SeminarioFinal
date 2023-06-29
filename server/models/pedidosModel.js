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

module.exports = {
  nuevoPedido,
  getPedido
};
