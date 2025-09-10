import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import catalogo from "../servicios/catalogo";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Verificar si hay un usuario autenticado al cargar la página

  /*  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data); // Guardar usuario en el contexto
        })
        .catch(() => {
          logout(); // Si el token es inválido, cerramos sesión
        });
    }
  }, [token]);*/

  // Función para iniciar sesión
  const login = (usuario, authToken) => {
    setUser(usuario), setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("usuario", usuario.nombre_usuario);
    localStorage.setItem("nombre", usuario.nombre_real);
    localStorage.setItem("permisos", usuario.permisos);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
