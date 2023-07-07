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

const nuevoPedido = async (codigoAdecion, idCliente, idMesa,idCodigoHabilitacion,idSucursal) => {
  const resultado = await db.query(
    `
        INSERT INTO pedidos (created_at ,updated_at,codigo_adecion,id_mesa,id_mozo,id_estado,id_cliente_inicial,id_codigo_habilitacion,id_sucursal)
        VALUES (now(),now(),$1,$2,null,1,$3,$4,$5) RETURNING id_pedido;
    `,
    [codigoAdecion, idMesa, idCliente,idCodigoHabilitacion,idSucursal]
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

const getPedidosCliente = async (idCliente) => {
  const resultado = await db.query(`
    SELECT SUM(CANTIDAD * COSTO) AS TOTAL,
      CMH.ID_CODIGO_HABILITACION,
      CMH.FECHA_GENERACION,
      P.ID_SUCURSAL,
      ES.NOMBRE
    FROM PEDIDOS P
    INNER JOIN PEDIDOS_INDIVIDUALES PI ON P.ID_PEDIDO = PI.ID_PEDIDO
    INNER JOIN ESTADOS_PEDIDO EP ON EP.ID_ESTADO_PEDIDO = P.ID_ESTADO
    INNER JOIN CODIGO_MESA_HABILITACION CMH ON CMH.ID_CODIGO_HABILITACION = P.ID_CODIGO_HABILITACION
    INNER JOIN PEDIDOS_DETALLE PD ON PI.ID_PEDIDO_INDIVIDUAL = PD.ID_PEDIDO_INDIVIDUAL
    INNER JOIN SUCURSALES S ON S.ID_SUCURSAL = P.ID_SUCURSAL
    INNER JOIN ESTABLECIMIENTOS ES ON ES.ID_ESTABLECIMIENTO = S.ID_ESTABLECIMIENTO
    WHERE ID_CLIENTE = $1
      AND P.ID_ESTADO != 1
    GROUP BY CMH.ID_CODIGO_HABILITACION,
      P.ID_SUCURSAL,
      CMH.FECHA_GENERACION,
      ES.NOMBRE
      ORDER BY FECHA_GENERACION DESC
  `,[idCliente]);

  return resultado.rows
}

const getPedidosMesaCliente = async (idCliente,idCodigoHabilitacion) => {
  const resultado = await db.query(`
  SELECT SUM(CANTIDAD * COSTO) AS TOTAL,
    P.ID_PEDIDO,
    CMH.ID_CODIGO_HABILITACION,
    P.NRO_PEDIDO,
    P.CREATED_AT,
    EP.id_estado_pedido,
    EP.estado
  FROM PEDIDOS P
  INNER JOIN PEDIDOS_INDIVIDUALES PI ON P.ID_PEDIDO = PI.ID_PEDIDO
  INNER JOIN ESTADOS_PEDIDO EP ON EP.ID_ESTADO_PEDIDO = P.ID_ESTADO
  INNER JOIN CODIGO_MESA_HABILITACION CMH ON CMH.ID_CODIGO_HABILITACION = P.ID_CODIGO_HABILITACION
  INNER JOIN PEDIDOS_DETALLE PD ON PI.ID_PEDIDO_INDIVIDUAL = PD.ID_PEDIDO_INDIVIDUAL
  INNER JOIN SUCURSALES S ON S.ID_SUCURSAL = P.ID_SUCURSAL
  INNER JOIN ESTABLECIMIENTOS ES ON ES.ID_ESTABLECIMIENTO = S.ID_ESTABLECIMIENTO
  WHERE PI.ID_CLIENTE = $1 AND  CMH.ID_CODIGO_HABILITACION = $2
    AND P.ID_ESTADO != 1
  GROUP BY CMH.ID_CODIGO_HABILITACION,
    P.ID_SUCURSAL,
    P.NRO_PEDIDO,
    P.CREATED_AT,
    P.ID_PEDIDO,
    EP.id_estado_pedido,
    EP.estado
  ORDER BY P.ID_PEDIDO DESC

`,[idCliente,idCodigoHabilitacion]);

return resultado.rows
}

const getPedidoDetalle = async (idPedido,idCliente) => {
  const resultado = await db.query(`
        SELECT NRO_PEDIDO,
        PROD.DESCRIPCION,
        CANTIDAD,
        COSTO
      FROM PEDIDOS P
      INNER JOIN PEDIDOS_INDIVIDUALES AS PI ON P.ID_PEDIDO = PI.ID_PEDIDO
      INNER JOIN PEDIDOS_DETALLE PD ON PI.ID_PEDIDO_INDIVIDUAL = PD.ID_PEDIDO_INDIVIDUAL
      INNER JOIN ESTADOS_PEDIDO EP ON P.ID_ESTADO = EP.ID_ESTADO_PEDIDO
      INNER JOIN PRODUCTOS PROD ON PROD.ID_PRODUCTO = PD.ID_PRODUCTO
      WHERE P.ID_PEDIDO = $1
        AND PI.ID_CLIENTE = $2
  `,[idPedido,idCliente]);

  return resultado.rows;
}

module.exports = {
  getPedido,
  nuevoPedido,
  nuevoPedidoIndividual,
  cargarDetallePedido,
  getPedidoIndividual,
  getPedidoEstadoNuevo,
  updateEstadoPedido,
  getPedidosCliente,
  getPedidoDetalle,
  getPedidosMesaCliente
};
