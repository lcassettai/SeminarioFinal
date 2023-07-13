const horariosModel = require('../models/horariosModel');

const getHorariosSucursal = async (req,res) => {
    const {id_sucursal } = req.params;

    try {
        const horarios = await horariosModel.getHorariosSucursal(id_sucursal);
        res.json(horarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al obtener los horarios"});
    }
}

module.exports = {
    getHorariosSucursal
}