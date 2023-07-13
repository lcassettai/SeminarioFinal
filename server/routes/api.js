const { Router } = require("express");
const middleware = require("./middleware");
const loginController = require("../controllers/loginController");
const provinciasController = require("../controllers/provinciasController");
const sucursalesController = require("../controllers/sucursalesController");
const productosController = require("../controllers/productosController");
const mesasController = require("../controllers/mesasController");
const categoriasController = require("../controllers/categoriasController");
const pedidosController = require("../controllers/pedidosController");
const gastosController = require("../controllers/gastosController");
const mediosPagoController = require("../controllers/mediosPagoController");
const notificacionesController = require("../controllers/notificacionesController");
const horariosController = require("../controllers/horariosController");
const reservasController = require("../controllers/reservasController");

const router = Router();

//======================
//   Login
//=======================
router.post("/login",loginController.login);

//======================
//   Provincias
//=======================
router.get("/provincias",middleware.verifyToken, provinciasController.getProvincias);
router.get("/provincias/:id", middleware.verifyToken,provinciasController.getProvincia);

//======================
//   Sucursales
//=======================
router.get("/sucursales",middleware.verifyToken, sucursalesController.getSucursales);
router.get("/sucursales/:id",middleware.verifyToken, sucursalesController.getSucursal);
router.get("/sucursales/:id_sucursal/menu",middleware.verifyToken,productosController.getAllProductos);

//======================
//   Mesas
//=======================
router.get("/mesas",middleware.verifyToken,mesasController.getMesas);

//======================
//   Pedidos
//=======================
router.get("/pedidos/cliente",middleware.verifyToken,pedidosController.getPedidosCliente);
router.get("/pedidos/cliente/:id_codigo_habilitacion",middleware.verifyToken,pedidosController.getPedidosMesaCliente);
router.get("/pedidos/:id_pedido",middleware.verifyToken,pedidosController.getPedido);
router.get("/pedidos/detalle/:id_pedido",middleware.verifyToken,pedidosController.getPedidoDetalle);
router.get("/pedidos/nuevo/:id_mesa",middleware.verifyToken,pedidosController.getPedidoMesaEstadoNuevo);
router.post("/pedidos/:id_pedido",middleware.verifyToken,pedidosController.cargarPedido);
router.post("/pedidos/nuevo/:codigo_habilitacion",middleware.verifyToken,pedidosController.nuevoPedido);

//======================
//   Categorias
//=======================
router.get("/categorias",middleware.verifyToken,categoriasController.getAllCategorias);

//======================
//   Gastos
//=======================
router.get("/gastos/:id_sucursal",middleware.verifyToken,gastosController.getGastosSucursal);

//======================
//   Medios de pago
//=======================
router.get("/medios_pago/:id_sucursal",middleware.verifyToken,mediosPagoController.getMediosPagoSucursal);

//======================
//   Notificaciones
//=======================
router.post("/notificaciones/:codigo_habilitacion",middleware.verifyToken,notificacionesController.cargarNuevaNotificacion);

//======================
//   Horarios
//=======================
router.get("/horarios/:id_sucursal",middleware.verifyToken,horariosController.getHorariosSucursal);

//======================
//   Reservas
//=======================
router.get("/reservas",middleware.verifyToken,reservasController.getReservas);
router.get("/reservas/:id_reserva",middleware.verifyToken,reservasController.getReserva);
router.post("/reservas/:id_sucursal",middleware.verifyToken,reservasController.nuevaReserva);
router.patch("/reservas/:id_reserva",middleware.verifyToken,reservasController.cancelarReserva);


module.exports = router;
