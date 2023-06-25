const productosModel = require('../models/productosModel');

const getAllProductos = async (req,res) => {
    const idSucursal = req.params.id_sucursal ;

    try {
        const productos = await productosModel.getAllProductosSucursal(idSucursal);
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

module.exports = {
    getAllProductos
}