import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import { listadoInicialRestaurantes } from '../../assets/datosPruebas'
import Titulo from "../../components/Titulo";
import Estrellas from "../../components/Estrellas";

const Restaurante = () => {
    const { idRestaurante } = useParams();

    const restauranteSeleccionado = listadoInicialRestaurantes.filter(({id}) => {
        return id == idRestaurante;
    });

    return <>
        <NavMenu />
        <div className="w-full pt-12">
            <img src={`/img/${restauranteSeleccionado[0].imagen}`} alt="" />
        </div>
        <div className="px-4">
                <Titulo text={restauranteSeleccionado[0].nombre}></Titulo>
                <Estrellas className="justify-center" cantidad={restauranteSeleccionado[0].estrellas}/>
                <div className="text-justify pt-4">
                    {restauranteSeleccionado[0].descripcion}
                </div>
        </div>
    </>
}

export default Restaurante;