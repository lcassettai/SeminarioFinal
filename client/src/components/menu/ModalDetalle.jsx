import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalDetalle = ({setProductos,estado,cambiarEstado,pedido,total}) => {
  let items = "";
  const MySwal = withReactContent(Swal);

  const notificar = () => toast.error(`Se quito el producto de tu pedido!`, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });;


  const quitarProducto = (id) => {
      setProductos((prevState) => {
        return [...prevState.filter((producto) => producto.id !== id)];  
      });
      notificar();
  };

  const handleCodigoVerificacion = async () =>{
    const { value: password } = await Swal.fire({
      titleText: 'Ingrese el codigo de 6 digitos provisto por el mozo',
      input: 'text',
      inputPlaceholder:'Codigo de verificacion',
      confirmButtonColor: "#009688",
      confirmButtonText: "Aceptar",
      denyButtonText: "Cancelar",
      showDenyButton:true,
      inputAttributes: {
        maxlength: 6,
        autocapitalize: 'on',
        required: 'on',
        autocorrect: 'off'
      }
    })
    
    if (password) {
      Swal.fire(`Ingreso el codigo: ${password}`)
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
              <span className="font-bold pt-4 ">Pedido Nro : 15645</span>
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
