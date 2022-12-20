import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import Producto from "../../components/menu/Producto";
import FiltroCategoriasMenu from "../../components/menu/FiltroCategoriasMenu";
import FooterResumen from "../../components/menu/FooterResumen";

const Menu = () => {
    const { codigoMesa } = useParams();
    
    return <>
        <NavMenu text="Menu" />
        <div className="contenedor" >
            <div className="mb-4">
                <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Buscar productos :</label>
                    <input type="text" className="input-text-md" placeholder="Producto">
                </input>
            </div>
            <FiltroCategoriasMenu />
            <div className="mt-4">
                <h3 className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Productos</h3>
            </div> 
            <div className="flex flex-col">
                <Producto nombre="Hamburguesa" estrellas="3" consumidores="1" precio="1200"/>
                <Producto nombre="Pizza" estrellas="4" consumidores="3" precio="1200"/>
                <Producto nombre="Lomito" estrellas="5" consumidores="2" precio="1700"/>
            </div>           
        </div>
       <FooterResumen productos="2" total="2000" />
    </>
}

export default Menu;