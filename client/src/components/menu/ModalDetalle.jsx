import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { cargarPedido } from "../../api/pedidos";
import {showSwalSuccess, showToast,showToastError} from '../../utils/notificaciones';

const ModalDetalle = ({setProductos,estado,cambiarEstado,pedido,total,cambiarEstadoPedido}) => {
  let items = "";

  const pedidoNuevo = JSON.parse(localStorage.getItem("pedido"));

  const quitarProducto = (id) => {
      setProductos((prevState) => {
        return [...prevState.filter((producto) => producto.id !== id)];  
      });
      showToast('Se quito el producto de tu pedido!');
  };

  const handleCodigoVerificacion = async () =>{
    if(total === 0 ){
      showToastError('No existen productos en su pedido');
      return;
    }
    
   //logica para cargar el pedido
   try {
    const result =  await cargarPedido(pedido);

    if(!result.ok){
      throw new Error('Algo salio mal');
    }

    showSwalSuccess('Info','Pedido creado con exito!');
    cambiarEstado(false);
    cambiarEstadoPedido(false);
    localStorage.removeItem('pedido');
   } catch (error) {
    showToastError("Algo salio mal");
    console.log(error);
   }
  }

  if (pedido.length > 0) {
    items = pedido.map((p) => {
      return (
        <div className="flex border shadow rounded-sm justify-between p-2  mt-4 " key={p.id}>
          <div className="flex flex-col">
            <span className="font-bold">{p.nombre}</span>
            <span>
              ${p.precio} x {p.cantidad}
            </span>
          </div>
          <div className="text-3xl text-red-800 ">
            <button className="align-middle	" onClick={() => quitarProducto(p.id)}>
                <IoClose />
            </button>
          </div>
        </div>
      );
    });
  } else {
    items = (
      <div
        className="flex items-center bg-yellow-500 text-white text-sm font-bold px-4 py-3 mt-4 rounded-sm"
      >
        <p>No existen productos en su pedido</p>
      </div>
    );
  }

  return (
    <>
      {estado && (
        <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex items-end justify-center z-50">
          <div className="w-full  h-full bg-white relative ">
            <BotonCerrar
              className="text-5xl"
              onClick={() => cambiarEstado(false)}
            >
              <IoClose />
            </BotonCerrar>
            <div className="pt-8 px-6  w-full">
              <h1 className="text-teal-800 font-bold text-2xl mb-4">
                DETALLE DEL PEDIDO
              </h1>
              <span className="font-bold pt-4 ">Pedido Nro : #{pedidoNuevo.nro_pedido  }</span>
              <br></br>
              <span className="font-bold pt-4 ">Codigo : {pedidoNuevo.codigo_adecion}</span>
              <div className="mb-4  ">
                {items}
              </div>
              <span className="text-teal-800 font-bold text-2xl pt-4">Total ${total}</span>
            </div>
            <div className="bg-teal-800 w-full py-4 text-white fixed bottom-0">
              <div className="text-center text-xl font-bold">
                <button onClick={handleCodigoVerificacion}>
                    Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDetalle;

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
