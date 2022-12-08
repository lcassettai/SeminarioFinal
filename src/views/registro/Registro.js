import Titulo from '../../components/Titulo';
import {Link} from 'react-router-dom';

const Registro = () => {
    return <>        
            <div className="flex justify-center items-center min-h-full">
                <div className="w-full m-4 mt-5">
                    <Titulo text="NUEVO USUARIO"></Titulo>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Nombre</label>
                        <input type="text" className="input-text-lg">
                        </input>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Apellido</label>
                        <input type="text" className="input-text-lg">
                        </input>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Fecha de nacimiento</label>
                        <input type="date" className="input-text-lg">
                        </input>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Numero de telefono</label>
                        <input type="text" className="input-text-lg">
                        </input>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Email</label>
                        <input type="email" className="input-text-lg">
                        </input>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">Clave</label>
                        <input type="password" className="input-text-lg">
                        </input>
                    </div>
                    <div className="flex space-x-4 justify-center mt-2 flex-col">
                        <Link to="/login">
                            <button type="button" className="button-lg">
                                Registrarme
                            </button>
                        </Link>
                    </div>  
                </div> 
            </div>
    </>
}

export default Registro;