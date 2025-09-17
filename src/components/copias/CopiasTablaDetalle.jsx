import React from "react";
import { useState, useEffect } from "react";
import catalogo from "../../servicios/catalogo";

const CopiasTablaDetalle = ({ filas, setFilas }) => {
  const [hojas, setHojas] = useState([]);
  const [colores, setColores] = useState([]);
  const [caras, setCaras] = useState([
    {
      PK_cara: 2,
      tipo_cara: "Una cara",
    },
    {
      PK_cara: 1,
      tipo_cara: "Doble cara",
    },
  ]);

  const obtenerHojas = async () => {
    try {
      const response = await catalogo.getObtenerHojas();
      const hojasData = response.data.data; // Guarda los datos en una variable temporal
      setHojas(hojasData);
    } catch (error) {
      console.error("Error al cargar los datos", error.response.data);
    }
  };

  const obtenerColores = async () => {
    try {
      const response = await catalogo.getObtenerColores();
      const coloresData = response.data.data; // Guarda los datos en una variable temporal
      setColores(coloresData);
    } catch (error) {
      console.error("Error al cargar los datos", error.response.data);
    }
  };

  useEffect(() => {
    obtenerHojas(); // Llamar la función
    obtenerColores();
  }, []);

  const eliminarFila = (id) => {
    setFilas(filas.filter((fila) => fila.id !== id));
  };

  const restarCantidad = (id) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) =>
        fila.id === id
          ? { ...fila, cantidad: fila.cantidad > 1 ? fila.cantidad - 1 : 1 }
          : fila
      )
    );
    actualizarImporte(id);
  };

  const calcularTotal = () => {
    return filas.reduce((total, fila) => total + fila.importe, 0).toFixed(2);
  };

  const agregarCantidad = (id) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) =>
        fila.id === id ? { ...fila, cantidad: fila.cantidad + 1 } : fila
      )
    );
    actualizarImporte(id);
  };
  const actualizarPrecio = (id, nuevoPrecio) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) =>
        fila.id === id ? { ...fila, precio: nuevoPrecio } : fila
      )
    );
    actualizarImporte(id);
  };

    const actualizarDesperdicio = (id, desperdicio) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) =>
        fila.id === id ? { ...fila, desperdicio } : fila
      )
    );
    actualizarImporte(id);
  };

  const actualizarImporte = (id) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) =>
        fila.id === id
          ? { ...fila, importe: fila.precio * fila.cantidad }
          : fila
      )
    );
  };

  const actualizarHoja = (idFila, hoja) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) => (fila.id === idFila ? { ...fila, hoja } : fila))
    );
  };

  const actualizarColor = (idFila, color) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) => (fila.id === idFila ? { ...fila, color } : fila))
    );
  };

  const actualizarCara = (idFila, cara) => {
    setFilas((prevFilas) =>
      prevFilas.map((fila) => (fila.id === idFila ? { ...fila, cara } : fila))
    );
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Tabla de Productos</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-2 px-4 text-left">Cantidad</th>
            <th className="py-2 px-4 text-left">Servicio</th>
            <th className="py-2 px-4 text-left">Precio</th>
            <th className="py-2 px-4 text-left">Tamaño de Hoja</th>
            <th className="py-2 px-4 text-left">Color</th>
            <th className="py-2 px-4 text-left">Caras</th>
            <th className="py-2 px-4 text-center">Desperdicio</th>
            <th className="py-2 px-4 text-center">Acciones</th>
            <th className="py-2 px-4 text-center">Importe</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {filas.map((fila) => (
            <tr
              key={fila.id}
              className="hover:bg-gray-100 border-b border-gray-200"
            >
              <td className="py-2 px-4">{fila.cantidad}</td>
              <td className="py-2 px-4">{fila.tipo_impresion}</td>
              <td className="py-2 px-4">
                <input
                  type="number"
                  value={fila.precio}
                  onChange={(e) =>
                    actualizarPrecio(fila.id, parseFloat(e.target.value) || 0)
                  }
                  className="w-20 border rounded-md p-1"
                />
              </td>
              <td className="py-2 px-4">
                <select
                  value={fila.hoja || ""} // aquí guardamos qué hoja está seleccionada en la fila
                  onChange={
                    (e) => actualizarHoja(fila.id, parseInt(e.target.value)) // pasamos el id de la fila y la hoja seleccionada
                  }
                  className="border rounded-md p-1"
                >
                  <option value="">-- Selecciona --</option>
                  {hojas.map((hoja) => (
                    <option key={hoja.PK_hoja} value={hoja.PK_hoja}>
                      {hoja.tipo_hoja}
                    </option>
                  ))}
                </select>
              </td>

              <td className="py-2 px-4">
                <select
                  value={fila.color || ""} // aquí guardamos qué hoja está seleccionada en la fila
                  onChange={
                    (e) => actualizarColor(fila.id, parseInt(e.target.value)) // pasamos el id de la fila y la hoja seleccionada
                  }
                  className="border rounded-md p-1"
                >
                  <option value="">-- Selecciona --</option>
                  {colores.map((color) => (
                    <option key={color.PK_color} value={color.PK_color}>
                      {color.tipo_color}
                    </option>
                  ))}
                </select>
              </td>

              <td className="py-2 px-4">
                <select
                  value={fila.cara || ""} // aquí guardamos qué hoja está seleccionada en la fila
                  onChange={
                    (e) => actualizarCara(fila.id, parseInt(e.target.value)) // pasamos el id de la fila y la hoja seleccionada
                  }
                  className="border rounded-md p-1"
                >
                  <option value="">-- Selecciona --</option>
                  {caras.map((cara) => (
                    <option key={cara.PK_cara} value={cara.PK_cara}>
                      {cara.tipo_cara}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4">
                <input
                  type="number"
                  value={fila.desperdicio}
                  onChange={(e) =>
                    actualizarDesperdicio(fila.id, parseFloat(e.target.value) || 0)
                  }
                  className="w-20 border rounded-md p-1"
                />
              </td>

              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => eliminarFila(fila.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => restarCantidad(fila.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Restar
                </button>
                <button
                  onClick={() => agregarCantidad(fila.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                >
                  Agregar
                </button>
              </td>
              <td className="py-2 px-4">{fila.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right font-bold">
        <p>Total: ${calcularTotal()}</p>
      </div>
    </div>
  );
};

export default CopiasTablaDetalle;
