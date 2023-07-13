import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showToast = (texto) =>
  toast.success(`${texto}`, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });

export const showToastError = (texto) =>
  toast.error(`${texto}`, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });

export const showSwalWarning = (titulo, texto) => {
  const mensaje = {
    title: <strong>{titulo}</strong>,
    html: <p>{texto}</p>,
    confirmButtonColor: "#009688",
    confirmButtonText: "Aceptar",
    icon: "warning",
  };

  MySwal.fire(mensaje);
};

export const showSwalSuccess = (titulo, texto, redireccionar) => {
  const mensaje = {
    title: <strong>{titulo}</strong>,
    html: <p>{texto}</p>,
    confirmButtonColor: "#009688",
    confirmButtonText: "Aceptar",
    icon: "success",
  };

  if (redireccionar) {
    MySwal.fire(mensaje).then((result) => {
      if (result.isConfirmed) {
        window.location.href = redireccionar;
      }
    });
  } else {
    MySwal.fire(mensaje);
  }
};

export const showSwalError = (titulo, texto) => {
  const mensaje = {
    title: <strong>{titulo}</strong>,
    html: <p>{texto}</p>,
    confirmButtonColor: "#009688", 
    denyButtonColor: "#e76f51ff",
    confirmButtonText: "Aceptar",
    icon: "error",
  };

  MySwal.fire(mensaje);
};

export const requestTableCode = async () => {
  const { value: codigoVerificacion } = await Swal.fire({
    html: "<b>Ingrese el codigo de 6 digitos provisto por el mozo</b>",
    input: "text",
    inputPlaceholder: "Codigo de verificacion",
    confirmButtonColor: "#009688",
    confirmButtonText: "Aceptar",
    denyButtonText: "Cancelar",
    denyButtonColor: "#e76f51ff",
    showDenyButton: true,
    reverseButtons: true,
    inputAttributes: {
      maxlength: 6,
      autocapitalize: "on",
      required: "on",
      autocorrect: "off",
    },
  });

  return codigoVerificacion;
};

export const requestConfirmation = async (titulo, texto) => {
  const result = await Swal.fire({
    title: titulo,
    html: `<p>${texto}</p>`,
    showDenyButton: true,
    denyButtonText: `Cancelar`,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#009688",
    denyButtonColor: "#e76f51ff",
    reverseButtons: true,
  });
    
  if (result.isConfirmed) {
    return true;
  } else if (result.isDenied) {
    return false;
  }
};
