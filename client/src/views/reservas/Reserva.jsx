import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Reserva = ({ reserva }) => {
  const fechaFormateada = new Date(
    reserva.fecha
  ).toLocaleDateString();

  return (
    <div>
      <Link to={`/reservas/${reserva.id_reserva}`}>
        <div className="shadow border border-gray-100 w-full mt-4 flex flex-row rounded-xl p-2 items-center">
          <div className="flex flex-row w-full  justify-between px-4 ">
            <div className="flex flex-col">
            <div className="text-left font-bold">
            {reserva.nombre}
            </div>
            <div className="text-left">
              {fechaFormateada}
            </div>
            </div>
          </div>
          <div className="  text-teal-700  text-2xl">
            <BsFillArrowRightCircleFill />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Reserva;
