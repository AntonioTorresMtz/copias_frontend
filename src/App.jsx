import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/login/Login";
import { AuthProvider } from "./contextos/AuthContext";

import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfigUsers from "./components/configuracion/ConfigUsers";
import ConfigAddUser from "./components/configuracion/ConfigAddUser";
import CopiasVenta from "./components/copias/CopiasVenta";
import CopiasVistaVentas from "./components/copias/vistaventas/CopiasVistaVentas";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/copiasVenta"
            element={
              <ProtectedRoute>
                <CopiasVenta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/copiasVistaVentas"
            element={
              <ProtectedRoute>
                <CopiasVistaVentas />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/crear_usuario" element={<ConfigAddUser />} />
          <Route
            path="/config_users"
            element={
              <ProtectedRoute>
                <ConfigUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
