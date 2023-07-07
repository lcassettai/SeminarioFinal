import { useEffect, useState } from "react";
import NavMenu from "../../layout/NavMenu";
import { getPedidosMesaCliente } from "../../api/pedidos";
import Pedido from "./Pedido";
import { useParams, Link } from "react-router-dom";

const MisPedidos = () => {
   const { idCodigoHabilitacion } = useParams();
  const [pedidosMesaCliente, setPedidosMesaCliente] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const data = await getPedidosMesaCliente(idCodigoHabilitacion);
        setPedidosMesaCliente(data);
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
        {pedidosMesaCliente
          ? pedidosMesaCliente.map((pedido) => {
              return <Pedido key={pedido.id_pedido} pedido={pedido} />;
            })
          : "Cargando"}
      </div>
    </>
  );
};

export default MisPedidos;
