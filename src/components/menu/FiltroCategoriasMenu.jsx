import FiltroMenuCategoria from "./FiltroMenuCategoria";
import {
  FaHamburger,
  FaPizzaSlice,
  FaGlassCheers,
  FaIceCream,
  FaFish,
} from "react-icons/fa";

const FiltroCategoriasMenu = () => {
    const handleSelected = (elemento) => {
        console.log(elemento);
    }

  return (
    <>
      <div>
        <div className="w-full grid grid-flow-col auto-cols-max overflow-x-auto container-snap 	">
          <FiltroMenuCategoria text="Hamburguesas" identificador="1" setOnSelected={handleSelected}>
            <FaHamburger />
          </FiltroMenuCategoria>
          <FiltroMenuCategoria text="Bebidas" identificador="2" setOnSelected={handleSelected}>
            <FaGlassCheers />
          </FiltroMenuCategoria>
          <FiltroMenuCategoria text="Pizzas"  identificador="3" setOnSelected={handleSelected}>
            <FaPizzaSlice />
          </FiltroMenuCategoria>
          <FiltroMenuCategoria text="Postres"  identificador="4" setOnSelected={handleSelected}>
            <FaIceCream />
          </FiltroMenuCategoria>
          <FiltroMenuCategoria text="Pescados"  identificador="5" setOnSelected={handleSelected}>
            <FaFish />
          </FiltroMenuCategoria>
        </div>
      </div>
    </>
  );
};

export default FiltroCategoriasMenu;
