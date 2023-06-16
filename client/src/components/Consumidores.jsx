import { FaUser } from "react-icons/fa";

const Consumidores = (props) => {
    let consumidoresArray = [];
    for(let i = 0; i < props.cantidad ; i++){
        consumidoresArray.push(<FaUser key={i}/>)
    }

    const consumidoresDibujados = consumidoresArray.map((estrella) => estrella);

    const className= "flex flex-row text-gray-800 " + props.className
    return <>
        <div className={className}>
            {consumidoresDibujados}
        </div>
    </>;
}

export default Consumidores;