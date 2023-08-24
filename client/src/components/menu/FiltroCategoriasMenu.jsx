import FiltroMenuCategoria from "./FiltroMenuCategoria";
import {
  FaHamburger,
  FaPizzaSlice,
  FaGlassCheers,
  FaIceCream,
  FaFish,
  FaSandwich,
} from "react-icons/fa";
import { GiWaterBottle } from "react-icons/gi";
import { IoIosBeer } from "react-icons/io";
import { GiSandwich } from "react-icons/gi"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getCategoriasSucursal} from '../../api/categorias';

const FiltroCategoriasMenu = ({setOnCategoriaSeleccionada}) => {
  const [categorias,setCategorias] = useState();
  const { idRestaurante } = useParams();

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const data = await getCategoriasSucursal(idRestaurante);
        
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    getCategorias();
  },[]);

  const handleSelected = (elemento) => {
    setOnCategoriaSeleccionada(elemento);
  }

  return (
    <>
      <div>        
        <div className="w-full grid grid-flow-col auto-cols-max overflow-x-auto container-snap 	">
          {
            categorias ? categorias.map( (c) => {
            let imagen = "";
            switch (c.categoria.toLowerCase()) {
              case "hamburguesas":
                imagen = <FaHamburger />
                break;
              case "pizzas":
                  imagen = <FaPizzaSlice />
                  break;
              case "lomitos":
                imagen = <GiSandwich />
                break;
              case "bebidas con alcohol":
                  imagen = <IoIosBeer />
                  break;
              case "bebidas sin alcohol":
                    imagen = <GiWaterBottle />
                    break;    
              default:
                break;
            }
            return (<FiltroMenuCategoria key={c.id_categoria} text={c.categoria}  identificador={c.id_categoria} setOnSelected={handleSelected}>
                {imagen}
            </FiltroMenuCategoria>)
            }) : ""
          }
        </div>
      </div>
    </>
  );
};

export default FiltroCategoriasMenu;
