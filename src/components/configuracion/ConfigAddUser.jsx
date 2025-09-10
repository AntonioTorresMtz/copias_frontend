import React, { use } from "react";
import { useState } from "react";
import catalogo from "../../servicios/catalogo";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ConfigAddUser = ({ isOpen, onClose, listaUsuarios }) => {
  const [passwordError, setPasswordError] = useState("");
  const [usuarioError, setUsuarioError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    validarContraseña(data);
  };
  if (!isOpen) return null;

  const enviarDatos = async (data) => {
    const datos = {
      nombre_usuario: data.nombre_usuario,
      nombre_real: data.nombre_real,
      password: data.contrasena1,
      permisos: parseInt(data.permisos),
    };
    console.log(datos);
    try {
      const response = await catalogo.postCrearUsuario(datos); // Asegúrate de invocar la función
      if (response.data.codigo == 201) {
        mensajeExito();
        cerrarFormulario();
      } else {
        console.log(response.data.errors);
      }
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };

  const validarContraseña = (data) => {
    data.contrasena1 === data.contrasena2
      ? validarUsuarios(data)
      : setPasswordError("Las contraseñas no coinciden.");
  };

  const validarUsuarios = (data) => {
    listaUsuarios.includes(data.nombre_usuario)
      ? setUsuarioError("El usuario ya existe.")
      : enviarDatos(data);
  };

  const handleFocusPassword = () => {
    setPasswordError("");
  };

  const handleFocusUsuario = () => {
    setUsuarioError("");
  };

  const mensajeExito = () => {
    Swal.fire({
      title: "Usuario Ingresado",
      text: "¡Se ha creado un nuevo usuario con exito!",
      icon: "success",
    });
  };

  const cerrarFormulario = () => {
    onClose();
    reset();
  };
  return (
    <div className="fixed inset-0 color-modal z-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Crear nuevo usuario
        </h2>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usuario">
              Nombre de Usuario
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Nombre de usuario"
              onChange={(e) => setNombreUsuario(e.target.value)}
              onFocus={handleFocusUsuario}
              {...register("nombre_usuario", {
                required: "El nombre de usuario es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9]{1,25}$/,
                  message:
                    "El nombre debe contener solo letras o numeros sin espacios y tener entre 1 a 25 caracteres",
                },
              })}
            />
            {errors.nombre_usuario && <p>{errors.nombre_usuario.message}</p>}
          </div>
          {usuarioError && <p style={{ color: "red" }}>{usuarioError}</p>}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usuario">
              Nombre real
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Nombre Real"
              onChange={(e) => setNombreReal(e.target.value)}
              {...register("nombre_real", {
                required: "El nombre real es obligatorio",
                pattern: {
                  value: /^[a-zA-Z\s]{1,255}$/,
                  message: "El nombre debe contener solo letras",
                },
              })}
            />
            {errors.nombre_real && <p>{errors.nombre_real.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contrasena">
              Contraseña:
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword1(e.target.value)}
              onFocus={handleFocusPassword}
              {...register("contrasena1", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value: /^.{6,}$/,
                  message:
                    "La contraseña debe tener como minimo seis caracteres",
                },
              })}
            />
            {errors.contrasena1 && <p>{errors.contrasena1.message}</p>}
          </div>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contrasena">
              Repita la contraseña:
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword2(e.target.value)}
              onFocus={handleFocusPassword}
              {...register("contrasena2", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value: /^.{6,}$/,
                  message:
                    "La contraseña debe tener como minimo seis caracteres",
                },
              })}
            />
            {errors.contrasena2 && <p>{errors.contrasena2.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contrasena">
              Permisos
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="number"
              placeholder="Permisos"
              onChange={(e) => setPermisos(e.target.value)}
              {...register("permisos", {
                required: "Los permisos son obligatorios",
                pattern: {
                  value: /^\d+$/,
                  message: "Los permisos deben ser un digito",
                },
              })}
            />
            {errors.permisos && <p>{errors.permisos.message}</p>}
          </div>
          <div className="flex flex-column">
            <button
              onClick={onClose}
              className="m-1 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              className="m-1 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigAddUser;
