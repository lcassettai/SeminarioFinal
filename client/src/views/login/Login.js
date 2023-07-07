import Titulo from '../../components/Titulo';
import Logo from '../../assets/img/logo.svg';
import './Login.css';
import {Link} from 'react-router-dom';
import {useState,createContext, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../api/login'


export default function Login() {
    const [usuario,setUsuario] = useState("");
    const [clave,setClave] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token !== 'null' && token !== undefined && token !== null && token !== '') {
            navigate('/menuHome');
        }
    },[]);

    const notificar = (error) => toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
    });

    const handleUsuario = (e) => {
        setUsuario(e.target.value);
    }

    const handleClave = (e) => {
        setClave(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();   
        try {
            const response = await loginUser({ usuario,clave});
        
            const result = await response.json();

            //Esto se puede mejorar ya que no es tan seguro 
            if(response.status === 401 || response.status === 400){
                notificar(result.error);
                localStorage.removeItem('token');
            }else{
                localStorage.setItem('token',result.token);
                localStorage.removeItem('pedido');
                navigate("/menuHome");
            }         
            
          } catch (error) {
            notificar("Algo salio mal, por favor intente mas tarde");
            console.error("Error:", error);
          }
    }

    return (
        <>          
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center min-h-full">
                    <div className="w-full m-4 mt-5">
                        <img className="logo" src={Logo} alt="logo"/>
                        <Titulo text="INICIAR SESION"></Titulo>
                        <div className="mb-3 w-full">
                            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Usuario</label>
                            <input type="text" className="input-text-lg" onChange={handleUsuario}>
                            </input>
                        </div>
                        <div className="mb-3 w-full">
                            <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Clave</label>
                            <input type="password" className="input-text-lg" onChange={handleClave}>
                            </input>
                        </div>
                        <a href="#" className="mb-4 font-bold font-center text-sky-600 text-left w-full inline-block font-sm" >¿Olvidaste tu clave?</a>
                        <div className="flex space-x-4 justify-center mt-2 flex-col">
                                <button
                                    type="submit"
                                    className="button-lg">
                                    Iniciar Sesion
                                </button>
                            <Link to="/registro" className="mt-5 font-bold font-center text-sky-600 text-center">Crear una cuenta nueva</Link>
                        </div>  
                    </div> 
                </div>
            </form>
        </>
    );
}