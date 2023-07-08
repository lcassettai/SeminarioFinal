const mediosPagoModel = require('../models/mediosPagoModel');

const getMediosPagoSucursal = async (req,res) => {
    try {
        const {id_sucursal} = req.params;

        const mediosPago = await mediosPagoModel.getMediosPagoSucursal(id_sucursal);

        res.json(mediosPago);

    } catch (error) {
        res.status(500).json({error:"No se pudo obtener los medios de pago"})
        console.error(error);
    }
}

module.exports = {
    getMediosPagoSucursal
}