import QrScanner from "../../components/QrScanner";
import NavMenu from "../../layout/NavMenu";
import Titulo from "../../components/Titulo";
import { useNavigate } from "react-router-dom";
import { getMesaByCodigo } from "../../api/mesas";
import {showSwalWarning} from "../../utils/notificaciones";
import { getPedidoEstadoNuevo } from "../../api/pedidos";

const EscanearQR = () => {
  const navigate = useNavigate();

  const scannerHandler = async (scanData) => {
    let codigoMesa = scanData.text;

    const mesa = await buscarMesaSucursal(codigoMesa);


    if (!mesa) {
      showSwalWarning('Codigo incorrecto!','No se encontro el codigo');
      return;
    }

    const pedido = await buscarPedidosEstadoNuevo(mesa.id_mesa);

    if(pedido){
      localStorage.setItem('pedido',JSON.stringify(pedido))
    }

    localStorage.setItem("mesa",codigoMesa);    
    navigate(`/restaurantes/${mesa.id_sucursal}/menu`);
  };

  const buscarMesaSucursal = async (codigoMesa) => {
    try {
      return await getMesaByCodigo(codigoMesa);
    } catch (error) {
      console.error();
    }
  };

  const buscarPedidosEstadoNuevo = async (idMesa) => {
    try {
      return await getPedidoEstadoNuevo(idMesa);     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavMenu />
      <div className="contenedor">
        <Titulo text="Escanear codigo QR" />
        <div className="flex flew-row justify-center">
          <QrScanner onScann={scannerHandler} />
        </div>
      </div>
    </>
  );
};

export default EscanearQR;
