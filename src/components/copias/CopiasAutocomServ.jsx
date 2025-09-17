import React, { useState } from "react";

const CopiasAutocomServ = ({ opciones }) => {
  const [busqueda, setBusqueda] = useState("");
  const [filtradas, setFiltradas] = useState([]);

  const handleChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.trim() === "") {
      setFiltradas([]);
      return;
    }

    // Filtrar opciones que empiecen con la letra escrita
    const resultados = opciones.filter((op) =>
      op.tipo_impresion.toLowerCase().startsWith(valor.toLowerCase())
    );
    setFiltradas(resultados);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={busqueda}
        onChange={handleChange}
        placeholder="Buscar impresión..."
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {filtradas.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          {filtradas.map((op, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setBusqueda(op.tipo_impresion);
                setFiltradas([]);
              }}
            >
              {op.tipo_impresion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CopiasAutocomServ;
