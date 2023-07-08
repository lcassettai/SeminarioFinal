import { useEffect, useState } from "react";
import NavMenu from "../../layout/NavMenu";
import { getPedidosMesaCliente } from "../../api/pedidos";
import { getGastosSucursal } from "../../api/gastos";
import Pedido from "./Pedido";
import { useParams } from "react-router-dom";
import BtnSolicitarCuenta from "./BtnSolicitarCuenta";
import { formatearEnPesos } from "../../utils/moneda";
import Gastos from "./Gastos";
import BtnFooterVolver from "../../components/BtnFooterVolver";


const MisPedidos = () => {
  const { idCodigoHabilitacion } = useParams();
  const [pedidosMesaCliente, setPedidosMesaCliente] = useState([]);
  const [gastosAdicionales, setgastosAdicionales] = useState([]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const data = await getPedidosMesaCliente(idCodigoHabilitacion);
        setPedidosMesaCliente(data);

        const gastos = await getGastosSucursal(data[0].id_sucursal);
        setgastosAdicionales(gastos);

        let totalPedido = calcularTotal(data);
        let totalGastos = calcularTotalGastos(gastos);
        setTotal(totalPedido + totalGastos);
        setSubtotal(totalPedido);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPedidos();
  }, []);

  const calcularTotal = (pedidos) => {
    return pedidos.reduce(
      (acumulador, actual) => acumulador + Number(actual.total),
      0
    );
  };

  const calcularTotalGastos = (gastos) => {
    return gastos.reduce(
      (acumulador, actual) => acumulador + Number(actual.monto),
      0
    );
  };

  return (
    <>
      <NavMenu text="Mis Pedidos" />
      <div className="contenedor">
      <div className="font-bold pt-2 px-2 text-xl">Pedidos realizados</div>
        {pedidosMesaCliente
          ? pedidosMesaCliente.map((pedido) => {
              return <Pedido key={pedido.id_pedido} pedido={pedido} />;
            })
          : "Cargando"}
        {gastosAdicionales && gastosAdicionales.length ? (
          <>
            {" "}
            <div className="pt-4 px-2 text-xl flex flex-row-reverse">
              <span>Subtotal : {formatearEnPesos(subtotal)}</span>
            </div>
            <div className="pt-4 ">
              <div className="font-bold  text-xl">Gastos adicionales</div>
              {gastosAdicionales.map((g, index) => {
                return <Gastos key={index} texto={g.gasto} monto={g.monto} />;
              })}
            </div>
          </>
        ) : (
          ""
        )}

        <div className="font-bold pt-4  text-teal-700 px-2 text-2xl flex flex-row-reverse">
          <span>Total : {formatearEnPesos(total)}</span>
        </div>
      </div>
      <BtnFooterVolver/>
      <BtnSolicitarCuenta />
      
    </>
  );
};

export default MisPedidos;
