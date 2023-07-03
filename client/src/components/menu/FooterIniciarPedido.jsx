import { iniciarPedidoNuevo } from '../../api/pedidos';
import { showToast,showToastError,requestTableCode } from '../../utils/notificaciones';

const FooterIniciarPedido = (props) => {

    const iniciarPedido = async () => {
        const codigoVerificacion = await requestTableCode();
          
          if (codigoVerificacion) {
            try {
              const data = await iniciarPedidoNuevo(codigoVerificacion);

              if(data){
                  localStorage.setItem("pedido",JSON.stringify(data));
                  props.setNuevoPedido(true);
                  showToast('Se inicio un nuevo pedido con exito!');
              }else{
                  localStorage.removeItem("pedido");
                  props.setNuevoPedido(false);
                  showToastError('El codigo ingresado es incorrecto!');
              }         
            } catch (error) {
              console.log(error);
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
  