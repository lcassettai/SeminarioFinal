const provinciasModel = require('../models/provinciasModel');

const getProvincias = async (req, res) => {
    try {
      const provincias = await provinciasModel.getAll();
      res.json(provincias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las provincias' });
    }
}

const getProvincia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await provinciasModel.get(id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las provincias' });
  }
}

module.exports = {
  getProvincias,
  getProvincia
};