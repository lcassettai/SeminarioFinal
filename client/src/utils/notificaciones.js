import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showToast = (texto) => toast.success(`${texto}`, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
});

export const showToastError = (texto) => toast.error(`${texto}`, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
});


export const showSwalWarning = (titulo,texto) => {
    const mensaje = {
        title: <strong>{titulo}</strong>,
        html: <p>{texto}</p>,
        confirmButtonColor: "#009688",
        confirmButtonText: "Aceptar",
        icon: "warning",
    };

    MySwal.fire(mensaje);
}

export const showSwalSuccess = (titulo,texto) => {
    const mensaje = {
        title: <strong>{titulo}</strong>,
        html: <p>{texto}</p>,
        confirmButtonColor: "#009688",
        confirmButtonText: "Aceptar",
        icon: "success",
    };

    MySwal.fire(mensaje);
}


export const showSwalError = (titulo,texto) => {
    const mensaje = {
        title: <strong>{titulo}</strong>,
        html: <p>{texto}</p>,
        confirmButtonColor: "#009688",
        confirmButtonText: "Aceptar",
        icon: "error",
    };

    MySwal.fire(mensaje);
}
