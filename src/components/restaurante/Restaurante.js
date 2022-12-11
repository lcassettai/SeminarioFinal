import Estrellas from '../Estrellas';

const Restaurante = (props) => {
    const className = " " + props.className;   

    return <>
        <div className={className}>   
            <div className="rounded overflow-hidden shadow-lg">
                <img className="w-full" src={props.imagenPortada} alt="Mountain" />
                <div className="px-4 pt-4">
                    <div className="font-bold text-xl mb-2">{props.nombre}</div>
                </div>
                <div className="px-4 pb-2 flex flex-row text-yellow-500	">
                       <Estrellas cantidad={props.estrellas}/>
                </div>
            </div>
        </div>
    </>
}

export default Restaurante;