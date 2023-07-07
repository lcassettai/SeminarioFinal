import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {formatearEnPesos} from "../../utils/moneda";

const Pedido = ({ pedido }) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const fecha_hora = new Date(pedido.created_at);
  let h = addZero(fecha_hora.getHours());
  let m = addZero(fecha_hora.getMinutes());
  let hora = h + ":" + m;

  return (
    <div>
      <div className="shadow-md border border-gray-100 w-full mt-4 flex flex-row rounded-xl p-2 items-center">
        <div className="flex flex-row w-full  justify-between px-6 ">
          <div className="text-center">
            <span className="font-bold">
              Pedido <br />
            </span>{" "}
            #{pedido.nro_pedido}
          </div>
          <div className="text-center">
            <span className="font-bold">
              Hora <br />
            </span>{" "}
            {hora}
          </div>
          <div className="text-center">
            <span className="font-bold">
              Estado
              <br />
            </span>{" "}
            {pedido.estado}
          </div>
          <div className="text-center">
            <span className="font-bold">
              Total
              <br />
            </span>{" "}
            {formatearEnPesos(pedido.total)}
          </div>
        </div>
        <div className="  text-teal-700  text-3xl">
          <Link to={`/pedidos/2/${pedido.id_pedido}`}>
            <BsFillArrowRightCircleFill />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
