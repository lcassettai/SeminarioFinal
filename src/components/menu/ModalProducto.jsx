import styled from "styled-components";
import Estrellas from "../../components/Estrellas";
import Consumidores from "../Consumidores";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ModalProducto = ({
  precio,
  imagen,
  nombre,
  estrellas,
  consumidores,
  estado,
  cambiarEstado,
  agregarProducto,
  setEstadoModal,
}) => {
  const [cantidad, setCantidad] = useState(0);

  const sumar = () => {
    setCantidad(cantidad + 1);
  };

  const restar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlPedido = () => {
    //Habria que cambiar el nombre del producto por un id
    agregarProducto((prevState) => {
      let productoEnCarrito = prevState.find((prod) => prod.id === nombre);

      return productoEnCarrito
        ? [
            ...prevState.map((prod) => prod.id === nombre ? {...prod,cantidad:prod.cantidad += cantidad} :{...prod}),
          ]
        : [
            ...prevState,
            {
              id: nombre,
              cantidad: cantidad,
              precio: precio
            },
          ];
    });
    setCantidad(0);
    setEstadoModal(false);
  };

  return (
    <>
      {estado && (
        <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex items-end justify-center z-50">
          <div className="w-full min-h-fit bg-white relative rounded-t-xl ">
            <BotonCerrar
              className="text-5xl"
              onClick={() => cambiarEstado(false)}
            >
              <IoClose />
            </BotonCerrar>
            <div className="pt-8 px-6  w-full">
              <div className="flex justify-center">
                <img src={imagen} className="imagen-menu" alt="" />
              </div>
              <div className="font-bold text-center text-teal-700 text-2xl mt-4 uppercase">
                {nombre}
              </div>
              <div className="mt-4 overflow-scroll max-h-96	">
                <div className="flex font-bold text-xl">
                  Comen : &nbsp; <Consumidores cantidad={consumidores} />
                </div>
                <div className="flex font-bold text-xl mt-4">
                  Opiniones : &nbsp; <Estrellas cantidad={estrellas} />
                </div>
                <div className="mt-4">
                  <span className="font-bold text-xl">Descripción</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque condimentum egestas lacus. Nam sed tortor ac
                    nulla sodales dapibus. Cras vulputate sapien in nisl
                    feugiat, a placerat lacus consectetur. Duis massa libero,
                    consectetur at elementum aliquam, sodales sit amet turpis.
                    Suspendisse ac risus sagittis, laoreet erat ultrices,
                    sodales tellus. Sed malesuada volutpat erat, eget fringilla
                    enim viverra vitae. Donec nec dolor quis ligula blandit
                    pretium nec eget lectus. Nam arcu sem, auctor accumsan
                    sollicitudin in, consequat vitae nulla. Nulla pharetra arcu
                    tellus, id ornare libero accumsan sed.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full p-6">
              <div className="font-bold text-2xl">${precio}</div>
              <div>
                <button className="button-producto mr-4" onClick={restar}>
                  -
                </button>
                <input
                  className="input-text-producto text-center"
                  value={cantidad}
                  readOnly
                />
                <button className="button-producto ml-4" onClick={sumar}>
                  +
                </button>
              </div>
            </div>
            <div className="bg-teal-800 w-full py-4 text-white">
              <div
                className="text-center text-xl font-bold"
                onClick={agregarAlPedido}
              >
                Agregar al pedido
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProducto;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`;

const BotonCerrar = styled.div`
    position:absolute;
    top:15px;
    right:15px;
    width:30px:
    height:30px;
    border:none;
    background:none;
    cursor:pointer;
    transition: .3s ease all;
    border-radius:5px;
    color:#264653ff;

    &:hover{
        background:#f2f2f2;
    }

    svg{
        width:100%;
        height:100%;
    }
`;
