import QrScanner from "../../components/QrScanner";
import NavMenu from "../../layout/NavMenu";
import Titulo from "../../components/Titulo";
import { useNavigate } from "react-router-dom";
import { getMesaByCodigo } from "../../api/mesas";
import {showSwalWarning} from "../../utils/notificaciones"

const EscanearQR = () => {
  const navigate = useNavigate();

  const scannerHandler = async (scanData) => {
    let codigoMesa = scanData.text;

    const mesa = await buscarMesaSucursal(codigoMesa);

    if (mesa) {
      localStorage.setItem("mesa",codigoMesa);    
      navigate(`/restaurantes/${mesa.id_sucursal}/menu`);
    } else {
      showSwalWarning('Codigo incorrecto!','No se encontro el codigo');
    }
  };

  const buscarMesaSucursal = async (codigoMesa) => {
    try {
      const result = await getMesaByCodigo(codigoMesa);
      const data = await result.json();

      return data;
    } catch (error) {
      console.error();
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
