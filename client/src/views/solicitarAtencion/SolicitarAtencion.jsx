import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  showToastError,
  showSwalSuccess,
  requestTableCode,
} from "../../utils/notificaciones";
import NavMenu from "../../layout/NavMenu";
import {cargarNotificacion } from "../../api/notificaciones";

const SolicitarAtencion = () => {
  const mensaje = useRef("");

  const handleSolicitud = async () => {
    const codigoHabilitacion = await requestTableCode();

    const notificacion = {
      id_tipo: 2,
      detalle: `Mensaje: ${mensaje.current.value}`,
    };

    const data = await cargarNotificacion(codigoHabilitacion, notificacion);

    if (!data) {
      showToastError("El codigo ingresado es incorrecto!");
      return;
    }

    showSwalSuccess(
      "Solicitud enviada!",
      "En breve un mozo se acercara para atenderlo",
      "/"
    );
  };

  return (
    <>
      <NavMenu text="Atencion" />
      <div className="contenedor">
        <div className="w-full">
          <h3 className="text-center text-teal-800 text-3xl font-bold my-12 mx-8">
            Solicitar Atención
          </h3>
        </div>
        <div className="">
          <div className="pb-2 font-bold">
            <p>Algo que le quieras notificar al mozo : </p>
          </div>
          <textarea
            name="mensaje"
            placeholder="Necesito..."
            className="h-20 input-text-lg h-80 	"
            ref={mensaje}
          ></textarea>
        </div>
        <div className="flex flex-row justify-evenly mt-12">
          <div>
            <Link to="/menuHome">
              <button type="button" className="bg-teal-200 button-lg-cancelar">
                Cancelar
              </button>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="button-lg"
              onClick={handleSolicitud}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolicitarAtencion;
