import { useParams, Link } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import Titulo from "../../components/Titulo";
import Estrellas from "../../components/Estrellas";
import { getRestaurante } from "../../api/restaurantes";
import { getHorariosSucursal } from "../../api/horarios";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMenuBook, MdOutlineCalendarMonth } from "react-icons/md";

const Restaurante = () => {
  const { idRestaurante } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [horarios, setHorarios] = useState(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRestaurante = async (id) => {
      try {
        const data = await getRestaurante(id);
        const horarios = await getHorariosSucursal(id);
        console.log(horarios);
        setHorarios(horarios);
        setRestaurante(data);
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
                      <div className="text-center text-xl font-bold pt-4">
              <span className="text-red-500 inline-block">
                <FaMapMarkerAlt />
              </span>
              {restaurante.direccion}
            </div>
            <div className="flex justify-around pt-4 mb-4">
              <Link to={`/restaurantes/${restaurante.id_sucursal}/reservas`}>
                <button className="bg-teal-700 button-lg">
                  Reservas &nbsp;
                  <MdOutlineCalendarMonth className="inline-block text-xl" />
                </button>
              </Link>
              <Link to={`/restaurantes/${restaurante.id_sucursal}/menu`}>
                <button className="bg-teal-700 button-lg">
                  Ver Menu &nbsp;
                  <MdMenuBook className="inline-block text-xl" />
                </button>
              </Link>
            </div>
            <div className="text-justify pt-4">
              {restaurante.descripcion}
            </div>
            <div className="pt-4 pb-4">
              <span className="font-bold text-xl">
                {" "}
                <MdOutlineCalendarMonth className="inline-block text-xl text-red-500 mb-1" />{" "}
                Dias y Horarios de atención{" "}
              </span>
              <ul className="text-sm">
                {horarios
                  ? horarios.map((h, index) => {
                      return (
                        <li key={index}>
                          <strong>{h.dia}</strong>
                          {` : ${h.hora_inicio} - ${h.hora_fin}`}
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        "Cargando"
      )}
    </>
  );
};

export default Restaurante;
