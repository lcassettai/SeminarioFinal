import Estrellas from '../Estrellas';
import './ItemRestaurante.css'

const ItemRestaurante = (props) => {
    const className = " " + props.className;   

    return <>
        <div className={className}>   
            <div className="rounded overflow-hidden shadow-lg item-restaurante ">
                <img className="w-full aspect-square object-cover" src={props.imagenPortada} alt="Mountain" />
                <div className="px-4 pt-4">
                    <div className="font-bold text-l mb-2">{props.nombre}</div>
                </div>
                <div className="px-4 pb-2 flex flex-row	">
                       <Estrellas cantidad={props.estrellas}/>
                </div>
            </div>
        </div>
    </>
}

export default ItemRestaurante;