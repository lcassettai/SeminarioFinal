import { useParams, Link } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import Titulo from "../../components/Titulo";
import { getRestaurante } from "../../api/restaurantes";
import { nuevaReserva } from "../../api/reservas";
import { useEffect, useState, useRef } from "react";
import { requestConfirmation,showSwalWarning,showSwalSuccess } from "../../utils/notificaciones"

const NuevaReserva = () => {
  const { idRestaurante } = useParams();
  const fecha = useRef(null);
  const hora = useRef(null);
  const personas = useRef(null);
  const detalle = useRef(null);
  const [restaurante, setRestaurante] = useState(null);

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRestaurante = async (id) => {
      try {
        const data = await getRestaurante(id);
        setRestaurante(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurante(idRestaurante);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!fecha.current.value || !hora.current.value  ||  !personas.current.value){
        showSwalWarning("Oops!","Debes cargar todos los campos");
        return;
    }

    const result = await  requestConfirmation("Nueva reserva",
    `<div style="text-align: left;">
    <strong>Lugar :</strong>  ${restaurante.nombre_establecimiento} <br>
    <strong>Direccion :</strong> ${restaurante.direccion}<br>  
    <strong>Día : </strong> ${ new Date(fecha.current.value).toLocaleDateString()}<br>  
    <strong>Hora :</strong> ${hora.current.value}<br>  
    <strong>Personas :</strong> ${personas.current.value}<br>  
    <br> Deseas continuar?<div>`);

    if(!result){
        return;
    }
    const datosReserva = {
      fecha : fecha.current.value,
      hora : hora.current.value,
      detalle : detalle.current.value,
      personas:  personas.current.value
    };

    try {
      const data = await nuevaReserva(restaurante.id_sucursal,datosReserva);

      if(data){
        showSwalSuccess('Reserva solicitada','',`/reservas/${data}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavMenu />
      {restaurante ? (
        <div>
          <div className="w-full	 pt-12">
            <img
              src={`${baseUrl}/images/${restaurante.imagen}`}
              alt=""
              className=" max-h-32 w-full aspect-square object-cover"
            />
          </div>
          <div className="px-4">
            <Titulo text={restaurante.nombre_establecimiento}></Titulo>
          </div>
        </div>
      ) : (
        "Cargando"
      )}
      <div className="px-4">
      <form onSubmit={handleSubmit}>
        <div className="font-bold py-2 px-2 text-xl text-center  uppercase ">
          Reservar mesa
        </div>
          <div className="flex ">
          <div className="mb-3 w-full mr-2">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
              Dia de reserva
            </label>
            <input type="date" className="input-text-lg" required ref={fecha}></input>
          </div>
          <div className="mb-3 w-full ml-4">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
              Hora de reserva
            </label>
            <input type="time" className="input-text-lg" required ref={hora}></input>
          </div>
          </div>
          <div className="mb-3 w-full">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
              Cantidad de personas
            </label>
            <input type="number"  min="1" step="1" max="40" className="input-text-lg" required ref={personas}></input>
          </div>
          <div className="mb-3 w-full">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
              Detalles
            </label>
            <textarea  placeholder="Algo que quieras aclarar?"  className="input-text-lg"  ref={detalle}></textarea>
          </div>
          <div className="flex justify-around mt-8">
            <Link
              to={`/restaurantes/${restaurante ? restaurante.id_sucursal : ""}`}
            >
              <button className="button-lg-cancelar">Cancelar</button>
            </Link>
            <div>
              <button type="submit" className="bg-teal-700 button-lg">Solicitar reserva</button>
            </div>
          </div>
       </form>
      </div>
    </>
  );
};

export default NuevaReserva;
