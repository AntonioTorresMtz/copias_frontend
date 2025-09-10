import { useState } from "react";
import { useAuth } from "../../contextos/AuthContext";
import { useNavigate } from "react-router-dom";
import catalogo from "../../servicios/catalogo";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      usuario: usuario,
      password: password,
    };
    try {
      const response = await catalogo.postLogin(datos); // Asegúrate de invocar la función
      if (response.data.codigo == 200) {
        console.log(response.data);
        login(response.data.user, response.data.token);
        navigate("/");
      } else {
        console.log("Usuario o contraseña invalidos");
      }
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };

  const ListarUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await catalogo.getObtenerVentas(); // Asegúrate de invocar la función
      console.log(response.data.data);
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión 
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usuario">
              Usuario:
            </label>
            <input
              type="text"
              placeholder="Correo"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contrasena">
              Contraseña:
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Iniciar
          </button>
          <button
            onClick={ListarUsers}
            className="mt-2 bg-green-500 text-white p-2"
          >
            Usarios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
