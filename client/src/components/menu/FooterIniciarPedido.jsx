import { iniciarPedidoNuevo } from '../../api/pedidos';
import { showToast,showToastError,requestTableCode } from '../../utils/notificaciones';

const FooterIniciarPedido = (props) => {

    const iniciarPedido = async () => {
        let codigoHabilitacion = "";
        
        if(localStorage.getItem("codigo_habilitacion")){
          codigoHabilitacion = localStorage.getItem("codigo_habilitacion");
        }else{
          codigoHabilitacion  = await requestTableCode();
        }
          
          if (codigoHabilitacion) {
            try {
              const data = await iniciarPedidoNuevo(codigoHabilitacion);

              if(data){
                  localStorage.setItem("pedido",JSON.stringify(data));
                  localStorage.setItem("codigo_habilitacion",codigoHabilitacion);
                  props.setNuevoPedido(true);
                  showToast('Se inicio un nuevo pedido con exito!');
              }else{
                  localStorage.removeItem("pedido");
                  props.setNuevoPedido(false);
                  showToastError('El codigo ingresado es incorrecto!');
              }         
            } catch (error) {
              console.error(error);
            }          
          }
    }
  
    return (
      <>
        <div className="fixed bottom-0 bg-teal-800 w-full px-4 py-3 text-white text-center">
          <div className="text-2xl font-bold" onClick={iniciarPedido} >Nuevo Pedido</div>
        </div>
      </>
    );
  };
  
  export default FooterIniciarPedido;
  