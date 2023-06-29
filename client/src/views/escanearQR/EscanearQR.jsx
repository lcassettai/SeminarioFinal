import QrScanner from "../../components/QrScanner";
import NavMenu from "../../layout/NavMenu";
import Titulo from "../../components/Titulo";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getMesaByCodigo } from "../../api/mesas";

const EscanearQR = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const scannerHandler = async (scanData) => {
    let codigoMesa = scanData.text;

    const mesa = await buscarMesaSucursal(codigoMesa);

    if (mesa) {
      localStorage.setItem("mesa",codigoMesa);    
      navigate(`/restaurantes/${mesa.id_sucursal}/menu`);
    } else {
      MySwal.fire({
        title: <strong>Codigo incorrecto!</strong>,
        html: <i>No se encontro el codigo</i>,
        confirmButtonColor: "#009688",
        confirmButtonText: "Aceptar",
        icon: "warning",
      });
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
