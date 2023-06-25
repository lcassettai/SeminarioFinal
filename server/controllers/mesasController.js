const mesasModel = require('../models/mesasModel');
const productosModel = require('../models/productosModel');

const getMesas = async (req,res) => {
    const {codigo} = req.query ;

    try {
        const mesa = await mesasModel.getMesas(codigo.toUpperCase());
        if(mesa){
            res.json(mesa[0]);
        }else{
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos de la mesa' });
    }
};



module.exports = {
    getMesas
}