import React, { useState } from "react";
import catalogo from "../../servicios/catalogo";

const CopiasVentaBuscar = ({ onProductoEncontrado }) => {
  const [claveProductos, setClaveProductos] = useState("");

  const handleInputChange = (e) => {
    setClaveProductos(e.target.value); // Actualizar el estado del producto
  };

  const handleBuscar = async (e) => {
    try {
      const response = await catalogo.getObtenerServiciosClave(claveProductos);
      console.log(response);

      if (response.data.codigo === 200 && response.data.data.length > 0) {
        onProductoEncontrado(response.data.data[0]); // Enviamos el producto al padre
        console.log("Producto encontrado:", response.data.data[0]);
      } else {
        console.log("Producto no encontrado");
        alert("Producto no encontrado en la base de datos.");
      }
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      alert("Ocurrió un error. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Buscar Producto</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Clave del producto"
          value={claveProductos}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md flex-1"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default CopiasVentaBuscar;
