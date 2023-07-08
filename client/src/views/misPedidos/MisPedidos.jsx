import { useEffect, useState } from "react";
import NavMenu from "../../layout/NavMenu";
import { getPedidosCliente } from "../../api/pedidos";
import PedidoAgrupado from "./PedidoAgrupado";
import BtnFooterVolver from "../../components/BtnFooterVolver";


const MisPedidos = () => {
  const [pedidosCliente, setPedidosCliente] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const data = await getPedidosCliente();
        setPedidosCliente(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPedidos();
  }, []);

  return (
    <>
      <NavMenu text="Mis Pedidos" />
      <div className="contenedor">
      <div className="font-bold pt-2 px-2 text-xl">Historial de Visitas</div>
        {pedidosCliente
          ? pedidosCliente.map((pedido) => {
              return <PedidoAgrupado key={pedido.id_codigo_habilitacion} pedido={pedido} />;
            })
          : "Cargando"}
      </div>
      <BtnFooterVolver navigateTo={`/menuHome`}/>

    </>
  );
};

export default MisPedidos;
