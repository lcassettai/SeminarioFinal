import { useParams, Link } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import { listadoInicialRestaurantes } from "../../assets/datosPruebas";
import Titulo from "../../components/Titulo";
import Estrellas from "../../components/Estrellas";
import { getRestaurante } from "../../api/restaurantes";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";


const Restaurante = () => {
  const { idRestaurante } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRestaurante = async (id) => {
      try {
        const response = await getRestaurante(id);
        const data = await response.json();
        setRestaurante(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurante(idRestaurante);
  }, []);

  return (
    <>
      <NavMenu />
      {restaurante ? (
        <div>
          <div className="w-full pt-12">
            <img src={`${baseUrl}/images/${restaurante.imagen}`} alt="" />
          </div>
          <div className="px-4">
            <Titulo text={restaurante.nombre_establecimiento}></Titulo>
            <Estrellas
              className="justify-center"
              cantidad={restaurante.valoracion}
            />
            <div className="pt-4 flex flex-row text-xl font-bold ">
              <span className="text-red-500 "><FaMapMarkerAlt/> </span> {restaurante.direccion}
            </div>
            <div className="text-justify pt-4">
              {restaurante.descripcion}
            </div>
            <br></br>

            <Link to="/restaurantes">
              <button className="button-lg-cancelar">Volver</button>
            </Link>
          </div>
        </div>
      ) : (
        "Cargando"
      )}
    </>
  );
};

export default Restaurante;
