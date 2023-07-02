import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getMesaByCodigo } from "../../api/mesas";
import { getPedidoEstadoNuevo } from "../../api/pedidos";
import { showSwalWarning } from "../../utils/notificaciones";

const Codigo = () => {
  const navigate = useNavigate();
  const primerElemento = useRef(null);
  const segundoElemento = useRef(null);
  const tercerElemento = useRef(null);
  const cuartoElemento = useRef(null);
  
  useEffect(() => {
    document.querySelector(`input[name=codigo-1]`).focus();
  });

  const handleCodigo = async () => {
    if (
      !primerElemento.current.value ||
      !segundoElemento.current.value ||
      !tercerElemento.current.value ||
      !cuartoElemento.current.value
    ) {
      showSwalWarning('Oops!','Debes llenar todos los campos');
      return;
    }

    let codigoMesa =
      primerElemento.current.value +
      segundoElemento.current.value +
      tercerElemento.current.value +
      cuartoElemento.current.value;

    const mesa = await buscarMesaSucursal(codigoMesa);

    if (!mesa) {
      showSwalWarning('Codigo incorrecto!','No se encontro el codigo');
      return;
    }

    const pedido = await buscarPedidosEstadoNuevo(mesa.id_mesa);

    if(pedido){
      localStorage.setItem('pedido',JSON.stringify(pedido))
    }

    localStorage.setItem("mesa",codigoMesa);  
    navigate(`/restaurantes/${mesa.id_sucursal}/menu`);
  };

  const buscarPedidosEstadoNuevo = async (idMesa) => {
    try {
      return await getPedidoEstadoNuevo(idMesa);     
    } catch (error) {
      console.error(error);
    }
  };

  const buscarMesaSucursal = async (codigoMesa) => {
    try {
      return await getMesaByCodigo(codigoMesa);     
    } catch (error) {
      console.error();
    }
  };

  const handleFocus = (e) => {
    const numOfFields = 4;
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    const posicion = parseInt(fieldIndex, 10);
    let next = null;    
    const key = e.key; // const {key} = event; ES6+

    if (key === "Backspace" || key === "Delete") {
      if (posicion > 0) {
        // Get the next input field
        const next = document.querySelector(
          `input[name=codigo-${posicion - 1}]`
        );
  
        // If found, focus the next field
        if (next !== null) {
          next.value = '';
          next.focus();
        }
      }
      return;
    }

    if (posicion < numOfFields) {
      // Get the next input field
      next = document.querySelector(
        `input[name=codigo-${posicion + 1}]`
      );

      // If found, focus the next field
      if (next !== null) {
        next.value = '';
        next.focus();
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 content-center alto-maximo ">
        <div className="w-full">
          <img className="m-auto text-center w-1/5 " src={Logo} />
          <h3 className="text-center text-teal-800 text-lg font-bold my-12 mx-8">
            Ingresar codigo de mesa que se encuentra ubicado debajo del codigo
            QR.
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <div className="mx-2 w-12">
            <input
              type="text"
              placeholder="-"
              maxLength={1}
              name="codigo-1"
              className="display-block input-text-lg text-center uppercase"
              ref={primerElemento}
              onKeyUp={handleFocus}
              onClick={ (e) => {e.target.value = ''} }
            ></input>
          </div>
          <div className="mx-2 w-12">
            <input
              type="text"
              placeholder="-"
              maxLength={1}
              name="codigo-2"
              className="display-block input-text-lg text-center uppercase"
              ref={segundoElemento}
              onKeyUp={handleFocus}
              onClick={ (e) => {e.target.value = ''} }
            ></input>
          </div>
          <div className="mx-2 w-12">
            <input
              type="text"
              placeholder="-"
              maxLength={1}
              name="codigo-3"
              className="display-block input-text-lg text-center uppercase"
              ref={tercerElemento}
              onKeyUp={handleFocus}
              onClick={ (e) => {e.target.value = ''} }
            ></input>
          </div>
          <div className="mx-2 w-12">
            <input
              type="text"
              placeholder="-"
              maxLength={1}
              name="codigo-4"
              className="display-block input-text-lg text-center uppercase"
              ref={cuartoElemento}
              onKeyUp={handleFocus}
              onClick={ (e) => {e.target.value = ''} }
            ></input>
          </div>
        </div>
        <div className="flex flex-row justify-evenly mt-12">
          <div>
            <Link to="/menuHome">
              <button type="button" className="bg-teal-200 button-lg-cancelar">
                Cancelar
              </button>
            </Link>
          </div>
          <div>
            <button type="button" className="button-lg" onClick={handleCodigo}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Codigo;
