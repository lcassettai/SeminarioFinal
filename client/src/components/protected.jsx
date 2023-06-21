import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Protected({ children }) {
  const token = localStorage.getItem("token");

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

  if (token === 'null' || token === undefined || token === null || token === '' ||  token === 'undefined') {
    notificar("Debe iniciar sesión para continuar");
    return <Navigate to="/" replace />
  }
  return children
}

export default Protected