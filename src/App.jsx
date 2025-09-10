import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/login/Login";
import { AuthProvider } from "./contextos/AuthContext";
import React, { useState } from "react";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfigUsers from "./components/configuracion/ConfigUsers";
import ConfigAddUser from "./components/configuracion/ConfigAddUser";
function App() {
  const Info = () => {
    return <h1>Info</h1>;
  };

  const About = () => {
    return <h1>About</h1>;
  };

  const Calendar = () => {
    return <h1>Calendar</h1>;
  };

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
            path="/info"
            element={
              <ProtectedRoute>
                <Info />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<Calendar />} />
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
