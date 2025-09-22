import React from "react";
import catalogo from "../../servicios/catalogo";
import { useState, useEffect } from "react";
import CopiasAutocomServ from "./CopiasAutocomServ";
import CopiasVentaBuscar from "./CopiasVentaBuscar";
import CopiasTablaDetalle from "./CopiasTablaDetalle";
import CopiasCerrarVenta from "./CopiasCerrarVenta";

const CopiasVenta = () => {
  const [servicios, setServicios] = useState([]);
  const [contadorId, setContadorId] = useState(1);
  const [validar, setValidar] = useState(false);

  const limpiarListaServicios = () => {
    setServicios([]);
  };

  //Funcion para agregar un servicio a la tabla
  const agregarServicioATabla = (servicio) => {
    setServicios((prevServicios) => {
      const nuevoId = contadorId;
      setContadorId(contadorId + 1); // incrementa el contador
      // Si no existe, agregar un nuevo producto
      return [
        ...prevServicios,
        {
          id: nuevoId,
          servicio: servicio.PK_impresion,
          cantidad: 1,
          tipo_impresion: servicio.tipo_impresion || "Nombre no disponible",
          color: null,
          precio: 2,
          hoja: null,
          desperdicio: 0,
          cara: null,
          importe: 1 * 2,
        },
      ];
    });
  };
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Gestion de Copias e Impresiones
      </h1>
      <CopiasCerrarVenta
        servicios={servicios}
        limpiarListaServicios={limpiarListaServicios}
        setValidar={setValidar}
      />
      <CopiasVentaBuscar onProductoEncontrado={agregarServicioATabla} />
      {/* Tabla Dinámica */}
      <CopiasTablaDetalle
        filas={servicios}
        setFilas={setServicios}
        validar={validar}
      />
    </div>
  );
};

export default CopiasVenta;
