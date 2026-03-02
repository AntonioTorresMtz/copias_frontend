import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  CardBody,
  Card,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import catalogo from "../../../servicios/catalogo";

const CopiasModalDetalles = ({ isOpen, onClose, idVenta }) => {
  const [detalles, setDetalles] = useState([]);
  const total = detalles.reduce((acc, row) => {
    return acc + row.cantidad * row.precio_unitario;
  }, 0);

  const obtenerDetalles = async () => {
    try {
      const response = await catalogo.getObtenerDetalleVentas(idVenta);
      const detallesData = response.data.data; // Guarda los datos en una variable temporal
      setDetalles(detallesData);
      console.log(detallesData);
    } catch (error) {
      console.error("Error al cargar los datos", error.response.data);
    }
  };

  const TABLE_HEAD = [
    { name: "Cantidad", selector: (row) => row.cantidad, sortable: true },
    { name: "Servicio", selector: (row) => row.tipo_impresion, sortable: true },
    { name: "Color", selector: (row) => row.tipo_color },
    { name: "Hoja", selector: (row) => row.tipo_hoja },
    {
      name: "Precio Unitario",
      selector: (row) => Number(row.precio_unitario).toFixed(2),
    },
    { name: "Caras", selector: (row) => row.caras },
    { name: "Desperdicio", selector: (row) => row.desperdicio },
    {
      name: "Importe",
      selector: (row) => (row.cantidad * row.precio_unitario).toFixed(2),
    },
  ];

  useEffect(() => {
    if (isOpen) {
      obtenerDetalles(idVenta);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
      <Card className="w-[1000px] max-h-[90vh] overflow-hidden rounded-2xl shadow-xl">
        {/* 🔹 Header con folio, fecha y botón cerrar */}
        <CardHeader className="flex justify-between items-center p-4">
          <div>
            <h2 className="text-xl font-semibold pt-5">Detalle de venta</h2>
            <p className="text-sm text-gray-600 pt-3">
             Folio: {detalles[0]?.PK_venta} | Fecha:  {detalles[0]?.fecha}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            X
          </button>
        </CardHeader>

        {/* 🔹 Tabla */}
        <CardBody className="overflow-y-auto max-h-[60vh]">
          <DataTable columns={TABLE_HEAD} data={detalles} noHeader />
        </CardBody>

        {/* 🔹 Footer con total */}
        <CardFooter className="flex justify-end items-center p-4 border-t">
          <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CopiasModalDetalles;
