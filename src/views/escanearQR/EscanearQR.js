import QrScanner from "../../components/QrScanner";
import NavMenu from '../../layout/NavMenu';
import Titulo from "../../components/Titulo";
import { useNavigate } from "react-router-dom";
import {listadoInicialRestaurantes} from "../../assets/datosPruebas"
import {filtrarRestaurantesPorCodigo} from "../../util"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const EscanearQR = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();

    const scannerHandler = (scanData) => {
        let codigoMesa = scanData.text;
        
        let restaurante = filtrarRestaurantesPorCodigo(listadoInicialRestaurantes,codigoMesa);

        if(!restaurante.length){
            MySwal.fire({
                title: <strong>Algo salio mal!</strong>,
                html: <i>No se encotró una mesa con este codigo</i>,
                confirmButtonColor: '#009688',
                confirmButtonText: 'Aceptar',
                icon: 'error'
            })
        }else{
            navigate("/restaurantes/" + restaurante[0].id + '/' +codigoMesa);
        }       
    }

    return <>
        <NavMenu />
        <div className="contenedor">
            <Titulo text="Escanear codigo QR" />
            <div className="flex flew-row justify-center">
                <QrScanner onScann={scannerHandler} />
            </div>
        </div>
    </>
}

export default EscanearQR;