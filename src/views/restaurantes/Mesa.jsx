import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";

const Mesa = () => {
    const { codigoMesa} = useParams();
    
    return <>
        <NavMenu />
        <h1>{codigoMesa}</h1>
    </>
}

export default Mesa;