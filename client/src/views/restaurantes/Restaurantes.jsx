import NavMenu from "../../layout/NavMenu";
import ItemRestaurante from "../../components/restaurante/ItemRestaurante";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllRestaurantes } from "../../api/restaurantes";

const Restaurantes = () => {
  const [listadoRestaurantesInicial, setListadoIncial] = useState();
  const [listadoRestaurantes, setListado] = useState();
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await getAllRestaurantes();
        const data = await response.json();

        setListado(data);
        setListadoIncial(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSucursales();
  }, []);

  const filtrarListado = (event) => {
    let restaurantesFiltrados = listadoRestaurantesInicial.filter(
      ({ nombre_establecimiento }) => {
        return nombre_establecimiento
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }
    );

    setListado(restaurantesFiltrados);
  };

  const mostrarRestaurantes = () => {
    if (listadoRestaurantes == null) {
      return "";
    }

    return listadoRestaurantes.map((restaurante) => {
      return (
        <Link
          to={`/restaurantes/${restaurante.id_sucursal}`}
          key={restaurante.id_sucursal}
        >
          <ItemRestaurante
            imagenPortada={`${process.env.REACT_APP_API_URL}/images/${restaurante.imagen}`}
            estrellas={restaurante.valoracion}
            nombre={restaurante.nombre_establecimiento}
          />
        </Link>
      );
    });
  };

  return (
    <>
      <NavMenu text="Restaurantes" />
      <div className="contenedor">
        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
          Buscar restaurante :
        </label>
        <input
          onChange={filtrarListado}
          type="text"
          className="input-text-lg"
          placeholder="Restaurante"
        ></input>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {mostrarRestaurantes()}
        </div>
      </div>
    </>
  );
};

export default Restaurantes;
