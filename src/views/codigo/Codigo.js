import Logo from '../../assets/img/logo.svg';
import {Link} from 'react-router-dom';
 
const Codigo = () => {
    return <>
        <div className="grid grid-cols-1 content-center alto-maximo ">
            <div className="w-full">
                <img className="m-auto text-center w-1/5 " src={Logo} />
                <h3 className="text-center text-teal-800 text-lg font-bold my-12 mx-8">
                    Ingresar codigo de mesa que se encuentra ubicado debajo del codigo QR.
                </h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="mx-2 w-12">
                    <input type="text" placeholder="-" className="display-block input-text-lg text-center uppercase">
                    </input>
                </div>
                <div className="mx-2 w-12">
                    <input type="text" placeholder="-" className="display-block input-text-lg text-center uppercase">
                    </input>
                </div>
                <div className="mx-2 w-12">
                    <input type="text" placeholder="-" className="display-block input-text-lg text-center uppercase">
                    </input>
                </div>
                <div className="mx-2 w-12">
                    <input type="text" placeholder="-" className="display-block input-text-lg text-center uppercase">
                    </input>
                </div>
            </div>
            <div className="flex flex-row justify-evenly mt-12">
                        <Link to="/menuHome">
                            <button
                                type="button"
                                className="bg-teal-200 button-lg-cancelar">
                                Cancelar
                            </button>
                        </Link>
                        <Link to="/">
                            <button
                                type="button"
                                className="button-lg">
                                Aceptar
                            </button>
                        </Link>
                </div> 
        </div>
    </>
}

export default Codigo;