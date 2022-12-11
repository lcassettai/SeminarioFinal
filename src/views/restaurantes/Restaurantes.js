import NavMenu from '../../layout/NavMenu';
import Restaurante from '../../components/restaurante/Restaurante';
import {Link} from 'react-router-dom';
import { useState } from 'react';

const listadoInicial = [
    {
        nombre: "El tano",
        estrellas: Math.floor(Math.random() * 6),
    },
    {
        nombre: "El Rancho",
        estrellas: Math.floor(Math.random() * 6),
    },
    {
        nombre: "Los pinos",
        estrellas: Math.floor(Math.random() * 6),
    },
    {
        nombre: "La rueda",
        estrellas: Math.floor(Math.random() * 6),
    },
    {
        nombre: "Vladimir resto",
        estrellas: Math.floor(Math.random() * 6),
    }
];

const Restaurantes = () => {
    const [listadoRestaurantes,setListado] = useState(listadoInicial);

    const filtrarListado = (event) => {
        let restaurantesFiltrados = listadoInicial.filter(({nombre}) => {
            return nombre.toLowerCase().includes(event.target.value.toLowerCase())
        })

        setListado(restaurantesFiltrados);
    }

    const mostrarRestaurantes = listadoRestaurantes.map((restaurante,i) => {
        return <Link to="/login" >
            <Restaurante imagenPortada="/img/demo-restaurante-1.jpg" estrellas={restaurante.estrellas} nombre={restaurante.nombre} />
        </Link>
    });
   

    return <>
        <NavMenu />
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