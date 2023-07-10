import React from 'react';
import { Navigate } from 'react-router-dom';
import { showToastError } from '../utils/notificaciones'

function Protected({ children }) {
  const token = localStorage.getItem("token");

  if (token === 'null' || token === undefined || token === null || token === '' ||  token === 'undefined') {
    showToastError("Debe iniciar sesión para continuar");
    return <Navigate to="/login" replace />
  }
  return children
}

export default Protected