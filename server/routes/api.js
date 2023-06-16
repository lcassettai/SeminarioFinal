const {Router} = require('express');
const provinciasController = require('../controllers/provinciasController');
const sucursalesController = require('../controllers/sucursalesController');

const router = Router();

router.get('/provincias', provinciasController.getProvincias);
router.get('/provincias/:id', provinciasController.getProvincia);

router.get('/sucursales',sucursalesController.getSucursales);
router.get('/sucursales/:id',sucursalesController.getSucursal);


module.exports = router;