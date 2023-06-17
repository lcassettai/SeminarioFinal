const sucursalesModel = require("../models/sucursalesModel");

const getSucursales = async (req, res) => {
  try {
    const sucursales = await sucursalesModel.getAll();
    if (sucursales.length === 0) {
      res.status(404).json({ error: "Sucursal no encontrada" });
      return;
    }

    res.json(sucursales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las sucursales" });
  }
};

const getSucursal = async (req, res) => {
  const id = req.params.id;
  try {
    const sucursal = await sucursalesModel.get(id);

    if (sucursal.length === 0) {
      res.status(404).json({ error: "Sucursal no encontrada" });
      return;
    }

    res.json(sucursal);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener la sucursal con id : ${id}` });
  }
};

module.exports = {
  getSucursales,
  getSucursal
};
