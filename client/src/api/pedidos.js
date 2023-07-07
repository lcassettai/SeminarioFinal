import {handleResponse}  from './middleWare';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/pedidos`;

export const iniciarPedidoNuevo = async (codigoHabilitacion) => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/nuevo/${codigoHabilitacion}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
};

export const getPedidoEstadoNuevo = async (idMesa) => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/nuevo/${idMesa}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
};

export const cargarPedido = async (pedidoDetalle) => {
  const token = window.localStorage.getItem("token");
  const pedido = window.localStorage.getItem("pedido");

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

export const getPedidosCliente = async () => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/cliente`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
}

export const getPedidosMesaCliente = async (idCodigoHabilitacion) => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/cliente/${idCodigoHabilitacion}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
}


export const getPedidoDetalle = async (idPedido) => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/detalle/${idPedido}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
}


export const getPedido = async (idPedido) => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/${idPedido}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await handleResponse(response);
}