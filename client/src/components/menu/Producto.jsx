import Estrellas from "../../components/Estrellas";
import Consumidores from "../Consumidores";
import { useState } from "react";
import ModalProducto from "./ModalProducto";
import {formatearEnPesos} from "../../utils/moneda";

const Producto = (props) => {
  const [estadoModal, setEstadoModal] = useState(false);
  const baseUrlImagen =  `${process.env.REACT_APP_API_URL}/images`

  return (
    <>
      <button onClick={() => setEstadoModal(!estadoModal)}>
        <div className="shadow-md border border-gray-100 w-full mt-4 flex flex-row rounded-xl p-2">
          <div className="">
            <img
              src={`${baseUrlImagen}/${props.imagen}`}
              className="imagen-menu  aspect-square	 object-contain"
              alt=""
            />
          </div>
          <div className="flex flex-col w-full px-2 ">
            <div className="font-bold text-left"> {props.nombre}</div>
            <div className="py-2 flex flex-row">
              <Consumidores cantidad={props.consumidores} />
            </div>
            <div className="flex flex-row justify-between w-full">
              <div className="font-bold text-teal-700">{formatearEnPesos(props.precio)}</div>
              <div>
                <Estrellas cantidad={props.estrellas} />
              </div>
            </div>
          </div>
        </div>
      </button>
      <ModalProducto
        estado={estadoModal}
        cambiarEstado={setEstadoModal}
        nombre={props.nombre}
        consumidores={props.consumidores}
        imagen={props.imagen}
        estrellas={props.estrellas}
        precio={props.precio}
        setProductos={props.setProductos}
        idProducto={props.idProducto}
        detalle={props.detalle}
        nuevoPedido={props.nuevoPedido}
        setEstadoModal={setEstadoModal}
      />
    </>
  );
};

export default Producto;
