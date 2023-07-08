import NavMenu from "../../layout/NavMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPedidosMesaCliente } from "../../api/pedidos";
import { getGastosSucursal } from "../../api/gastos";
import { getMediosPagoSucursal } from "../../api/mediosPago";
import { cargarNotificacion } from "../../api/notificaciones";
import Pedido from "./Pedido";
import Gastos from "./Gastos";
import BtnSolicitarCuenta from "./BtnSolicitarCuenta";
import BtnFooterVolver from "../../components/BtnFooterVolver";
import { formatearEnPesos } from "../../utils/moneda";
import {
  showSwalWarning,
  requestTableCode,
  showSwalSuccess,
  showToastError,
} from "../../utils/notificaciones";

const MisPedidos = () => {
  const { idCodigoHabilitacion } = useParams();
  const [pedidosMesaCliente, setPedidosMesaCliente] = useState([]);
  const [gastosAdicionales, setgastosAdicionales] = useState([]);
  const [mediosPago, setMediosPago] = useState([]);
  const [medioPagoSeleccionado, setMedioPagoSeleccionado] = useState(0);
  const [montoEntregar, setMontoEntregar] = useState("");
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const data = await getPedidosMesaCliente(idCodigoHabilitacion);
        setPedidosMesaCliente(data);

        const gastos = await getGastosSucursal(data[0].id_sucursal);
        setgastosAdicionales(gastos);

        const medios = await getMediosPagoSucursal(data[0].id_sucursal);
        setMediosPago(medios);

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

  const handleMedioPago = (e) => {
    const idMedioPago = e.target.value;

    setMedioPagoSeleccionado(idMedioPago);

    if (idMedioPago != 1) {
      setMontoEntregar("");
    }
  };

  const handleMontoEntregar = (e) => {
    const monto = e.target.value;
    setMontoEntregar(monto);
  };

  const handleSolicitarCuenta = async () => {
    if (!medioPagoSeleccionado) {
      showSwalWarning("Oops", "Debe seleccionar un medio de pago");
      return;
    }

    if (medioPagoSeleccionado == "Efectivo" && !montoEntregar) {
      showSwalWarning("Oops", "Debe indicar el monto con el que va a pagar");
      return;
    }

    const codigoHabilitacion = await requestTableCode();

    let notificacion = "";

    if (medioPagoSeleccionado == "Efectivo" && !montoEntregar) {
      notificacion = {
        id_tipo: 1,
        detalle: `Mediod Pago: ${medioPagoSeleccionado} - Monto: ${montoEntregar}`,
      };
    } else {
      notificacion = {
        id_tipo: 1,
        detalle: `Mediod Pago: ${medioPagoSeleccionado}`,
      };
    }

    const data = await cargarNotificacion(codigoHabilitacion, notificacion);

    if (!data) {
      showToastError("El codigo ingresado es incorrecto!");
      return;
    }

    showSwalSuccess(
      "Cuenta solicitada!",
      "En breve un mozo se acercara para finalizar el pedido",
      "/"
    )
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
        <div className="mt-8">
          {mediosPago ? (
            <select
              onChange={handleMedioPago}
              className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-teal-700 focus:border-teal-700 hoever:bg-teal-700 block w-full p-2.5 "
            >
              <option defaultValue value="">
                -- Seleccione --
              </option>
              {mediosPago.map((m) => {
                return (
                  <option key={m.id_medio_pago} value={m.medio}>
                    {m.medio}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}
        </div>
        {medioPagoSeleccionado == "Efectivo" ? (
          <div className="mt-3 w-full">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold"></label>
            <input
              type="number"
              className="input-text-lg"
              placeholder="Con cuanto vas a pagar"
              onChange={handleMontoEntregar}
            ></input>
          </div>
        ) : (
          ""
        )}
      </div>
      <BtnFooterVolver />
      <div onClick={handleSolicitarCuenta}>
        <BtnSolicitarCuenta />
      </div>
    </>
  );
};

export default MisPedidos;
