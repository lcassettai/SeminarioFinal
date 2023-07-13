const reservasModel = require('../models/reservasModel');

const getReserva = async (req,res) => {
    const cliente = req.usuario.id_cliente;
    const {id_reserva} = req.params;

    try {
        const reserva = await reservasModel.getReserva(id_reserva,cliente);
        res.json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error la obtener la reserva'});
    }
}

const getReservas = async (req,res) => {
    const cliente = req.usuario.id_cliente;

    try {
        const reservas = await reservasModel.getReservas(cliente);
        res.json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error la obtener la reserva'});
    }
}

const nuevaReserva = async (req,res) => {
    const datosReserva = req.body;
    const cliente = req.usuario.id_cliente;
    const {id_sucursal} = req.params;

    try {
        const reserva = await reservasModel.nuevaReserva(id_sucursal,cliente,datosReserva);
        
        res.json(reserva[0].id_reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'No se pudo cargar la reserva'});
    }
}

const cancelarReserva = async (req,res) => {
    const cliente = req.usuario.id_cliente;
    const {id_reserva} = req.params;

    try {
        const reserva = await reservasModel.actualizarEstado(id_reserva,cliente,3);
        
        res.json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'No se pudo cancelar la reserva'});
    }
}

module.exports = {
    getReserva,
    getReservas,
    nuevaReserva,
    cancelarReserva
}