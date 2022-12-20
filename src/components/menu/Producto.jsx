import { propTypes } from "react-qr-scanner";
import Estrellas from "../../components/Estrellas";
import Consumidores from "../Consumidores";

const Producto = (props) => {
    return (
        <>
            <div className="shadow-md border border-gray-100 w-full mt-4 flex flex-row rounded-xl p-2">
                <div>
                <img src={`/img/demo-hamburguesa.png`} className="imagen-menu" alt="" />
                </div>
                <div className="flex flex-col w-full px-2">
                    <div className="font-bold"> {props.nombre}</div>
                    <div className="py-2 flex flex-row">
                        <Consumidores cantidad={props.consumidores}/>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="font-bold text-teal-700">
                            ${props.precio}
                        </div>
                        <div>
                            <Estrellas cantidad={props.estrellas}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Producto;