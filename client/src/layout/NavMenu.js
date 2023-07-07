import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Logo from '../assets/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';


function NavMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const texto = props.text !== undefined ? props.text : 'Restaurante';
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem('pedido');
        navigate("/login");
    }

    return (
        <div>
            <nav className="shadow-lg fixed w-full bg-white z-50	">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-8 w-8 inline-block"
                                    src={Logo}
                                    alt="Logo"
                                />
                                <h3 className="text-2xl font-bold inline-block pl-4 "> {texto}</h3>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        to="/"
                                        className="text-black hover:bg-teal-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        to="/pedidos"
                                        className="text-black hover:bg-teal-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Mis Pedidos
                                    </Link>
                                    <Link
                                        to="/restaurantes"
                                        className="text-black hover:bg-teal-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Solicitar la cuenta
                                    </Link>
                                    <button
                                        onClick={handleLogOut}
                                        className="text-black hover:bg-teal-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Cerrar Sesion
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-white bg-teal-800"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                      <div className="md:hidden" id="mobile-menu">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    <Link
                                        to="/"
                                        className="text-black hover:bg-teal-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        to="/pedidos"
                                        className="text-black hover:bg-teal-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Mis Pedidos
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-black hover:bg-teal-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Llamar al mozo
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-black hover:bg-teal-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Solicitar la cuenta
                                    </Link>
                                    <button
                                        onClick={handleLogOut}
                                        className="text-black hover:bg-teal-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Cerrar Sesion
                                    </button>
                            </div>
                        </div>
                </Transition>
            </nav>
        </div>
    );
}

export default NavMenu;
