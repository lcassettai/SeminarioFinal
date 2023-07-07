import { useEffect, useState } from "react";
import EstadosSteper from "../../components/steper/EstadosSteper";
import NavMenu from "../../layout/NavMenu";
import Step from "../../components/steper/Step";
import { useParams, Link } from "react-router-dom";
import { getPedidoDetalle, getPedido} from "../../api/pedidos";
import {formatearEnPesos} from "../../utils/moneda";

const PedidoDetalle = () => {
  const { idPedido } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [total, setTotal] = useState(null);
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const getDetalle = async () => {
      const pedido = await getPedido(idPedido);
      const detalle = await getPedidoDetalle(idPedido);

      setTotal(
        detalle.reduce((acumulador, actual) => acumulador + (actual.cantidad * actual.costo),0)
      );

      setDetalle(detalle);
      setPedido(pedido);
    };

    getDetalle();
  }, []);

  return (
    <>
      <NavMenu text="Home" />

      <div className="contenedor">
        <div className="font-bold py-2 px-2 text-2xl text-center  text-teal-700 uppercase ">
          Pedido N° {pedido ? pedido.nro_pedido : ""}
        </div>
        <EstadosSteper estadoActivo={pedido ? (pedido.id_estado - 2) : 0}>
          <Step text="Solicitado" />
          <Step text="Preparación" />
          <Step text="Entregado" />
        </EstadosSteper>
        <div className="font-bold pt-2 px-2 text-xl">Detalle del pedido</div>
        {detalle
          ? detalle.map((d, index) => {
              return (
                <div
                  key={index}
                  className="shadow-md border border-gray-100 w-full mt-4 flex flex-row rounded-xl p-4 justify-between"
                >
                  <div className="font-bold">{d.descripcion}</div>
                  <div>{`${formatearEnPesos(d.costo)} x ${d.cantidad}`}</div>
                </div>
              );
            })
          : "Cargando"}
        <div className="font-bold pt-6 text-teal-700 px-3 text-xl flex flex-row-reverse">
          <span>Total : ${formatearEnPesos(total)}</span>
        </div>
      </div>
    </>
  );
};

export default PedidoDetalle;
