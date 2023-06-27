const categoriasModel = require('../models/categoriasModel');

const getAllCategorias = async (req,res) => {
    const idSucursal = req.query.id_sucursal;

    try {
        const categorias = await categoriasModel.getCategoriasSucursal(idSucursal);
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

module.exports = {
    getAllCategorias
}