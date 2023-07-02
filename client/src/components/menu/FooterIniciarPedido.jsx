import { iniciarPedidoNuevo } from '../../api/pedidos';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from 'react-toastify';

const FooterIniciarPedido = (props) => {
    const MySwal = withReactContent(Swal);

    const notificar = (texto) => toast.success(`${texto}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
    });  

    const notificarError = (texto) => toast.error(`${texto}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
    });  

    const iniciarPedido = async () => {
        const { value: codigoVerificacion } = await Swal.fire({
            html: '<b>Ingrese el codigo de 6 digitos provisto por el mozo para iniciar un nuevo pedido</b>',
            input: 'text',
            inputPlaceholder:'Codigo de verificacion',
            confirmButtonColor: "#009688",
            confirmButtonText: "Aceptar",
            denyButtonText: "Cancelar",
            showDenyButton:true,
            reverseButtons:true,
            inputAttributes: {
              maxlength: 6,
              autocapitalize: 'on',
              required: 'on',
              autocorrect: 'off'
            }
          })
          
          if (codigoVerificacion) {
            const data = await iniciarPedidoNuevo(codigoVerificacion);
            console.log(data);
            if(data){
                localStorage.setItem("pedido",JSON.stringify(data));
                props.setNuevoPedido(true);
                notificar('Se inicio un nuevo pedido con exito!');
            }else{
                localStorage.removeItem("pedido");
                props.setNuevoPedido(false);
                notificarError('El codigo ingresado es incorrecto!');
            }                   
          }
    }
  
    return (
      <>
        <div className="fixed bottom-0 bg-teal-800 w-full px-4 py-2 text-white text-center">
          <div className="text-lg font-bold" onClick={iniciarPedido} >Nuevo Pedido</div>
        </div>
      </>
    );
  };
  
  export default FooterIniciarPedido;
  