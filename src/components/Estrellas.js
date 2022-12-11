import { FaStar,FaStarHalfAlt,FaRegStar } from "react-icons/fa";

const Estrellas = (props) => {
    let estrellasArray = [];
    for(let i = 0; i < 5 ; i++){
        if(i < props.cantidad){
            estrellasArray.push(<FaStar key={i}/>)
        }else{
            estrellasArray.push(<FaRegStar key={i}/>)
        }
    }

    const estrellasDibujadas = estrellasArray.map((estrella) => estrella);

    const className= "flex flex-row  text-yellow-500 " + props.className
    return <>
        <div className={className}>
            {estrellasDibujadas}
        </div>
    </>;
}

export default Estrellas;