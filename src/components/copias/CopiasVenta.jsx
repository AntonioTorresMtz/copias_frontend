import React from "react";
import catalogo from "../../servicios/catalogo";
import { useState, useEffect } from "react";
import CopiasAutocomServ from "./CopiasAutocomServ";
import CopiasVentaBuscar from "./CopiasVentaBuscar";
import CopiasTablaDetalle from "./CopiasTablaDetalle";

const CopiasVenta = () => {
  const [servicios, setServicios] = useState([]);

  const limpiarListaServicios = () => {
    setServicios([]);
  };

  //Funcion para agregar un servicio a la tabla
  const agregarServicioATabla = (servicio) => {
    setServicios((prevServicios) => {
      // Buscar si el producto ya existe en el array
      const servicioExistente = prevServicios.find(
        (s) => s.id === servicio.PK_impresion
      );

      if (servicioExistente) {
        // Si existe, actualizar la cantidad
        return prevServicios.map((s) =>
          s.id === servicio.PK_impresion
            ? {
                ...s,
                cantidad: s.cantidad + 1,
                importe: (s.cantidad + 1) * s.precio,
              }
            : s
        );
      } else {
        // Si no existe, agregar un nuevo producto
        return [
          ...prevServicios,
          {
            id: servicio.PK_impresion,
            cantidad: 1,
            tipo_impresion: servicio.tipo_impresion || "Nombre no disponible",
            color: null,
            precio: 2,
            hoja: null,
            desperdicio: 0,
            cara: null,
            importe: 0,
          },
        ];
      }
    });
  };
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <CopiasVentaBuscar onProductoEncontrado={agregarServicioATabla} />
      {/* Tabla Dinámica */}
      <CopiasTablaDetalle filas={servicios} setFilas={setServicios} />
    </div>
  );
};

export default CopiasVenta;
