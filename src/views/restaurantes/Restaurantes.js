import NavMenu from '../../layout/NavMenu';
import ItemRestaurante from '../../components/restaurante/ItemRestaurante';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { listadoInicialRestaurantes } from '../../assets/datosPruebas'

const Restaurantes = () => {
    const [listadoRestaurantes,setListado] = useState(listadoInicialRestaurantes);

    const filtrarListado = (event) => {
        let restaurantesFiltrados = listadoInicialRestaurantes.filter(({nombre}) => {
            return nombre.toLowerCase().includes(event.target.value.toLowerCase())
        })

        setListado(restaurantesFiltrados);
    }

    const mostrarRestaurantes = listadoRestaurantes.map((restaurante) => {
        return <Link to={`/restaurantes/${restaurante.id}`}  key={restaurante.id} >
            <ItemRestaurante imagenPortada={`/img/${restaurante.imagen}`} estrellas={restaurante.estrellas} nombre={restaurante.nombre} />
        </Link>
    });
   

    return <>
        <NavMenu text="Restaurantes" />
        <div className="contenedor">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Buscar restaurante :</label>
            <input onChange={filtrarListado} type="text" className="input-text-lg" placeholder="Restaurante">
            </input>
            <div className="mt-4 grid grid-cols-2 gap-4">   
                {mostrarRestaurantes}              
            </div>
        </div>
    </>
}

export default Restaurantes;