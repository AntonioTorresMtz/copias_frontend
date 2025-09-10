import React from "react";

const Home = () => {
  return (
    <div className="h-screen bg-orange-500 p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">
        ¡Hola {localStorage.getItem("nombre")}!
      </h1>
      <p className="mt-4 text-white">
        ¡Espero estes teniendo un día excelente! ¿Listo para un dia lleno de
        productividad?
      </p>
    </div>
  );
};

export default Home;
