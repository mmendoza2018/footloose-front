import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const PrivateRoute = ({ element }) => {
  const { authState } = useContext(AuthContext);
    let isAuthenticated = authState.logged;

    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" replace /> // Redirige a la página de inicio de sesión si no está autenticado
    );
  };

  export default PrivateRoute;