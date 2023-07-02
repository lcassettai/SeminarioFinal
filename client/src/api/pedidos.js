import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/pedidos`;

export const iniciarPedidoNuevo = async (codigoVerificacion) => {
  const token = window.localStorage.getItem("token");
  const mesa = window.localStorage.getItem("mesa");

  if (mesa == null || mesa == undefined || mesa == "") {
    return null;
  }

  const response = await fetch(`${baseUrl}/nuevo/${mesa}/${codigoVerificacion}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
};

export const cargarPedido = async (pedidoDetalle) => {
  const token = window.localStorage.getItem("token");
  const mesa = window.localStorage.getItem("mesa");
  const pedido = window.localStorage.getItem("pedido");

  if (mesa == null || mesa == undefined || mesa == "") {
    return null;
  }

  if (pedido == null || pedido == undefined || pedido == "") {
    return null;
  }

  const idPedido = JSON.parse(pedido).id_pedido;

  const response = await fetch(`${baseUrl}/${idPedido}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(pedidoDetalle),
  });

  return await handleResponse(response);
};
