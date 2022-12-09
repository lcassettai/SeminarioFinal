import {Link} from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';
import './menuHome.css';
import { TbHandClick } from "react-icons/tb";
import { BiQrScan, BiSearchAlt} from "react-icons/bi";




const MenuHome = () => {
    return (
        <>
            <div className="grid grid-cols-1 content-center  alto-maximo mx-2">
                <div className="w-full mt-10 ">
                    <Link className="button-lg text-2xl uppercase"><BiQrScan className="inline-block mr-3  text-3xl" />Escanear QR</Link>                    
                 </div>
                 <div className="w-full mt-10">
                    <Link className="button-lg text-2xl uppercase"><TbHandClick className="inline-block mr-3  text-3xl" />Ingresar codigo</Link>                    
                 </div>
                 <div className="w-full mt-10 text-2xl">
                    <Link className="button-lg uppercase"><BiSearchAlt className="inline-block mr-3  text-3xl" />Buscar Restaurate</Link>                    
                 </div>
            </div>
        </>
    );
}

export default MenuHome;