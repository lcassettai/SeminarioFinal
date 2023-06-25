const { Router } = require("express");
const middleware = require("./middleware");
const loginController = require("../controllers/loginController");
const provinciasController = require("../controllers/provinciasController");
const sucursalesController = require("../controllers/sucursalesController");
const productosController = require("../controllers/productosController");
const mesasController = require("../controllers/mesasController");

const router = Router();

router.post("/login",loginController.login);

router.get("/provincias",middleware.verifyToken, provinciasController.getProvincias);
router.get("/provincias/:id", middleware.verifyToken,provinciasController.getProvincia);

router.get("/sucursales",middleware.verifyToken, sucursalesController.getSucursales);
router.get("/sucursales/:id",middleware.verifyToken, sucursalesController.getSucursal);
router.get("/sucursales/:id_sucursal/menu",middleware.verifyToken,productosController.getAllProductos);

router.get("/mesas",middleware.verifyToken,mesasController.getMesas);



module.exports = router;
