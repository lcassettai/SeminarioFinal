import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import FiltroCategoriasMenu from "../../components/menu/FiltroCategoriasMenu";

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
        </div>
        <footer className="fixed bottom-0 bg-teal-800 w-full px-4 py-2 flex flex-row justify-between text-white">
            <div className="text-center text-sm">
                <span className="font-bold">Productos</span><br></br> 4
            </div>
            <div className="flex items-center text-lg font-bold">
                Ver pedido
            </div>
            <div className="text-center text-sm">
                <span className="font-bold">Total</span><br></br> $2000
            </div>
        </footer>
    </>
}

export default Menu;