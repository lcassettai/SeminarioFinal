import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getMesaByCodigo } from "../../api/mesas";

const Codigo = () => {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const primerElemento = useRef(null);
  const segundoElemento = useRef(null);
  const tercerElemento = useRef(null);
  const cuartoElemento = useRef(null);

  const handleCodigo = async () => {
    if (
      !primerElemento.current.value ||
      !segundoElemento.current.value ||
      !tercerElemento.current.value ||
      !cuartoElemento.current.value
    ) {
      MySwal.fire({
        title: <strong>Oops!</strong>,
        html: <i>Debes llenar todos los campos</i>,
        confirmButtonColor: "#009688",
        confirmButtonText: "Aceptar",
        icon: "warning",
      });
      return;
    }

    let codigoMesa =
      primerElemento.current.value +
      segundoElemento.current.value +
      tercerElemento.current.value +
      cuartoElemento.current.value;

    const mesa = await buscarMesaSucursal(codigoMesa);

    if (mesa) {
      localStorage.setItem("mesa",codigoMesa);  
      navigate(`/restaurantes/${mesa.id_sucursal}/menu`);
      navigate(0);
    } else {
      MySwal.fire({
        title: <strong>Codigo incorrecto!</strong>,
        html: <i>No se encontro el codigo</i>,
        confirmButtonColor: "#009688",
        confirmButtonText: "Aceptar",
        icon: "warning",
      });
    }
  };

  const buscarMesaSucursal = async (codigoMesa) => {
    try {
      const result = await getMesaByCodigo(codigoMesa);
      const data = await result.json();

      return data;
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
