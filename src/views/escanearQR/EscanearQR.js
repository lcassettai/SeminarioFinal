import QrScanner from "../../components/QrScanner";
import NavMenu from '../../layout/NavMenu';
import Titulo from "../../components/Titulo";

const EscanearQR = () => {
    return <>
        <NavMenu />
        <div className="contenedor">
            <Titulo text="Escanear codigo QR" />
            <div className="flex flew-row justify-center">
                <QrScanner />
            </div>
        </div>
    </>
}

export default EscanearQR;