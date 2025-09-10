import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contextos/AuthContext";

function ProtectedRoute({ children }) {
  // Cambia element a children
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // Renderiza el componente hijo si el usuario está autenticado
}

export default ProtectedRoute;
