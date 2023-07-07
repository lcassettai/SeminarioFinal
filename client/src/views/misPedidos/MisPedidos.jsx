import { useEffect, useState } from "react";
import NavMenu from "../../layout/NavMenu";
import { getPedidosCliente } from "../../api/pedidos";
import PedidoAgrupado from "./PedidoAgrupado";

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
      <NavMenu text="Home" />
      <div className="contenedor">
        {pedidosCliente
          ? pedidosCliente.map((pedido) => {
              return <PedidoAgrupado key={pedido.id_codigo_habilitacion} pedido={pedido} />;
            })
          : "Cargando"}
      </div>
    </>
  );
};

export default MisPedidos;
