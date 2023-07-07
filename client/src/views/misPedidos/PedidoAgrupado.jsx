import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const PedidoAgrupado = ({ pedido }) => {
  const fechaFormateada = new Date(pedido.fecha_generacion).toLocaleDateString();

  return (
    <div>
      <div className="shadow-md border border-gray-100 w-full mt-4 flex flex-row rounded-xl p-2 items-center">
        <div className="flex flex-row w-full  justify-between px-6 ">
        <div className="text-center">
            <span className="font-bold">Fecha <br/></span> {fechaFormateada}
          </div>
          <div className="text-center">
            <span className="font-bold">Lugar <br/></span> {pedido.nombre}
          </div>      
          <div className="text-center">
            <span className="font-bold">Total<br/></span> ${pedido.total}
          </div>      
        </div>
        <div className="  text-teal-700  text-3xl">
          <Link to={`/pedidos/${pedido.id_codigo_habilitacion}`}>
            <BsFillArrowRightCircleFill />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PedidoAgrupado;
