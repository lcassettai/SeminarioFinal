const gastosModel = require('../models/gastosModel');

const getGastosSucursal = async (req,res) => {
    const {id_sucursal } = req.params;

    try {
        const gastos = await gastosModel.getGastosSucursal(id_sucursal);
        res.json(gastos);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al obtener los gastos"});
    }
}

module.exports = {
    getGastosSucursal
}