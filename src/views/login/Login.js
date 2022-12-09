import Titulo from '../../components/Titulo';
import Logo from '../../assets/img/logo.svg';
import './Login.css';
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <>          
            <div className="flex justify-center items-center min-h-full">
                <div className="w-full m-4 mt-5">
                    <img className="logo" src={Logo} alt="logo"/>
                    <Titulo text="INICIAR SESION"></Titulo>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Usuario</label>
                        <input type="text" className="input-text-lg">
                        </input>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Clave</label>
                        <input type="password" className="input-text-lg">
                        </input>
                    </div>
                    <a href="#" className="mb-4 font-bold font-center text-sky-600 text-left w-full inline-block font-sm" >¿Olvidaste tu clave?</a>
                    <div className="flex space-x-4 justify-center mt-2 flex-col">
                        <Link to="/menuHome">
                            <button
                                type="button"
                                className="button-lg">
                                Iniciar Sesion
                            </button>
                        </Link>
                        <Link to="/registro" className="mt-5 font-bold font-center text-sky-600 text-center">Crear una cuenta nueva</Link>
                    </div>  
                </div> 
            </div>
        </>
    );
}