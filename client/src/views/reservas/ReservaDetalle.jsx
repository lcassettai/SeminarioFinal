import { getReserva, cancelarReserva } from "../../api/reservas";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavMenu from "../../layout/NavMenu";
import {
  requestConfirmation,
  showSwalSuccess,
  showToastError,
} from "../../utils/notificaciones";

const ReservaDetalle = () => {
  const [reserva, setReserva] = useState(null);
  const { idReserva } = useParams();

  useEffect(() => {
    const getReservaCliente = async () => {
      try {
        const data = await getReserva(idReserva);
        data[0].fechaFormateada = new Date(data[0].fecha).toLocaleDateString();

        setReserva(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getReservaCliente();
  }, []);

  const handleCancelarReserva = async () => {
    const cancelar = await requestConfirmation(
      "Cancelar reserva",
      "Esta seguro que desea cancelar la reserva?"
    );

    if (!cancelar) {
      return;
    }

    try {
      const estado = await cancelarReserva(reserva.id_reserva);
      console.log(estado);
      showSwalSuccess("Reserva cancelada", "", "/");
    } catch (error) {
      showToastError("Algo salio mal");
      console.error(error);
    }
  };

  return (
    <>
      <NavMenu text="Reservas" />
      <div className="contenedor">
        <div className="font-bold pt-2 text-2xl">Reserva</div>
        {reserva ? (
          <div className="pt-2 ">
            <div>
              <span className="font-bold">Estado :</span> {reserva.estado}
            </div>
            <div>
              <span className="font-bold">Lugar :</span> {reserva.nombre}
            </div>
            <div>
              <span className="font-bold">Direccion : </span>
              {reserva.direccion}
            </div>
            <div>
              <span className="font-bold">Fecha : </span>
              {reserva.fechaFormateada}
            </div>
            <div>
              <span className="font-bold">Hora : </span>
              {reserva.hora}
            </div>
            <div>
              <span className="font-bold">Personas : </span>
              {reserva.personas}
            </div>
            <div>
              <span className="font-bold">Detalle : </span>
              {reserva.detalle}
            </div>
            {reserva.id_estado_reserva != 3 ? (
              <div className="mt-8">
                <button
                  className="button-lg-cancelar"
                  onClick={handleCancelarReserva}
                >
                  Cancelar reserva
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ReservaDetalle;
