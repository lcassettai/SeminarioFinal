import NavMenu from '../../layout/NavMenu';
import ItemRestaurante from '../../components/restaurante/ItemRestaurante';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Restaurantes = () => {
    const [listadoRestaurantes,setListado] = useState();

    useEffect(() => {
        const fetchSucursales = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/sucursales');
            const data = await response.json();
            setListado(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchSucursales();
      }, []);

    const filtrarListado = (event) => {
        let restaurantesFiltrados = listadoRestaurantes.filter(({nombre}) => {
            return nombre.toLowerCase().includes(event.target.value.toLowerCase())
        })

        setListado(restaurantesFiltrados);
    }


    const mostrarRestaurantes = () =>{
        if(listadoRestaurantes == null){
            return '';
        }

        return listadoRestaurantes.map((restaurante) => {
            return <Link to={`/restaurantes/${restaurante.id_sucursal}`}  key={restaurante.id_sucursal} >
                <ItemRestaurante imagenPortada={`http://localhost:4000/images/${restaurante.imagen}`} estrellas={restaurante.valoracion} nombre={restaurante.nombre_establecimiento} />
            </Link>
        })
    }

    return <>
        <NavMenu text="Restaurantes" />
        <div className="contenedor">
            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Buscar restaurante :</label>
            <input onChange={filtrarListado} type="text" className="input-text-lg" placeholder="Restaurante">
            </input>
            <div className="mt-4 grid grid-cols-2 gap-4">   
                {mostrarRestaurantes()  }              
            </div>
        </div>
    </>
}

export default Restaurantes;