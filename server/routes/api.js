const { Router } = require("express");
const middleware = require("./middleware");
const loginController = require("../controllers/loginController");
const provinciasController = require("../controllers/provinciasController");
const sucursalesController = require("../controllers/sucursalesController");
const productosController = require("../controllers/productosController");
const mesasController = require("../controllers/mesasController");
const categoriasController = require("../controllers/categoriasController");
const pedidosController = require("../controllers/pedidosController");

const router = Router();

router.post("/login",loginController.login);

router.get("/provincias",middleware.verifyToken, provinciasController.getProvincias);
router.get("/provincias/:id", middleware.verifyToken,provinciasController.getProvincia);

router.get("/sucursales",middleware.verifyToken, sucursalesController.getSucursales);
router.get("/sucursales/:id",middleware.verifyToken, sucursalesController.getSucursal);
router.get("/sucursales/:id_sucursal/menu",middleware.verifyToken,productosController.getAllProductos);

router.get("/mesas",middleware.verifyToken,mesasController.getMesas);

router.post("/pedidos/nuevo/:codigo_identificacion/:codigo_ingreso",middleware.verifyToken,pedidosController.nuevoPedido);

router.get("/categorias",middleware.verifyToken,categoriasController.getAllCategorias);


module.exports = router;
