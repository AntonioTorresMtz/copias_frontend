import React from "react";
import Swal from "sweetalert2";
import Loader from "../../extras/loader";
import DataTable from "react-data-table-component";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import catalogo from "../../../servicios/catalogo";
import { useState, useEffect } from "react";
import ConfigAddUser from "../../configuracion/ConfigAddUser";
import ConfigUpdateUser from "../../configuracion/ConfigUpdateUser";
import CopiasModalDetalles from "./CopiasModalDetalles";

function CopiasVistaVentas() {
  const [selectedFechaIni, setSelectedFechaIni] = useState("");
  const [selectedFechaFin, setSelectedFechaFin] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("all");
  const idUsuario = localStorage.getItem("idUsuario");
  const [ventaSeleccionada, setventaSeleccionada] = useState("");
  const TABS = [
    {
      label: "Todos",
      value: "all",
    },
    {
      label: "Exito",
      value: 1,
    },
    {
      label: "Cancelado",
      value: 0,
    },
  ];

  const TABLE_HEAD = [
    { name: "Folio", selector: (row) => row.PK_venta, sortable: true },
    { name: "Total", selector: (row) => row.total },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Detalles",
      cell: (row) => (
        <div className="flex flex-row">
          <EyeIcon
            className="w-4 fill-blue-500 hover:fill-blue-700"
            onClick={() => handleEdit(row)}
          />

          <TrashIcon
            className="w-4 fill-red-500 hover:fill-red-700"
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const handleFechaInicio = (event) => {
    setSelectedFechaIni(event.target.value);
  };

  const handleFechaFinal = (event) => {
    setSelectedFechaFin(event.target.value);
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.estado === 0, // 👈 condición
      style: {
        backgroundColor: "#ffcccc", // Rojo claro
        color: "black",
        fontWeight: "bold",
      },
    },
  ];

  const handleEdit = (row) => {
    setventaSeleccionada(row.PK_venta);
    console.log(ventaSeleccionada);
    setIsModalUpdOpen(true);
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "¿Estas seguro de cancelar esta compra?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        cancelarVenta(row.PK_venta);
      }
    });
  };

  const cancelarVenta = async (id) => {
    const data = {
      id_usuario: parseInt(idUsuario),
      id_venta: id,
    };
    console.log(data);
    try {
      const response = await catalogo.patchCancelarVena(data);
      if (response.data.codigo == 201) {
        Swal.fire("Venta cancelada", "", "success");
        obtenerVentas();
      } else {
        console.log(response.data.errors);
      }
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };

  const [ventas, setVentas] = useState([]);
  const [nombresUsuarios, setNombresUsuarios] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdOpen, setIsModalUpdOpen] = useState(false);

  const dataFiltrada = ventas.filter((row) => {
    if (filtro === "all") return true;
    return row.estado === Number(filtro);
  });

  const openModal = () => {
    setIsModalAddOpen(true);
  };

  const closeModal = () => {
    setIsModalAddOpen(false);
  };

  const nuevaTabla = () => {
    setIsModalAddOpen(false);
    setIsModalUpdOpen(false);
    obtenerVentas();
  };

  const obtenerVentas = async () => {
    try {
      const response = await catalogo.getObtenerVentasHoy();
      const ventasData = response.data.data; // Guarda los datos en una variable temporal
      setVentas(ventasData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos", error.response.data);
    }
  };

  const obtenerVentasFiltro = async () => {
    const data = {
      fecha_inicio: selectedFechaIni,
      fecha_fin: selectedFechaFin,
    };
    try {
      setLoading(true);
      const response = await catalogo.postObtenerVentasFiltro(data);
      const ventasData = response.data.data; // Guarda los datos en una variable temporal
      setVentas(ventasData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos", error.response.data);
    }
  };

  const filtrarTabla = () =>{
    obtenerVentasFiltro();
  }

  useEffect(() => {
    obtenerVentas(); // Llamar la función
  }, []);

  return (
    <>
      <div className="flex justify-center items-center bg-white-100">
        <Card className="mt-5 h-full w-3/4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Lista de Usuarios
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Revisa la información de todos lo usuarios
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <div>
                  <label htmlFor="date-input">Fecha de Inicio:</label>
                  <input
                    type="date"
                    id="date-input"
                    value={selectedFechaIni}
                    onChange={handleFechaInicio}
                  />
                </div>
                <div>
                  <label htmlFor="date-input">Fecha de Final:</label>
                  <input
                    type="date"
                    id="date-input"
                    value={selectedFechaFin}
                    onChange={handleFechaFinal}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs
                value={filtro}
                onChange={(value) => setFiltro(value)}
                className="w-full md:w-max"
              >
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <button
                  onClick={() => filtrarTabla()}                
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md  transition duration-300 ease-in-out focus:outline-none  
                          py-2 px-2 focus:ring-4 focus:ring-blue-300"
                >
                  Filtrar
                </button>
              </div>
            </div>
          </CardHeader>
          {loading ? (
            <Loader />
          ) : (
            <CardBody className="overflow-scroll px-0">
              <DataTable
                columns={TABLE_HEAD}
                data={dataFiltrada}
                pagination
                paginationPerPage={10}
                conditionalRowStyles={conditionalRowStyles}
              />
            </CardBody>
          )}
        </Card>
      </div>
      <ConfigAddUser
        isOpen={isModalAddOpen}
        onClose={nuevaTabla}
        listaUsuarios={nombresUsuarios}
      ></ConfigAddUser>
      <CopiasModalDetalles
        isOpen={isModalUpdOpen}
        onClose={nuevaTabla}
        idVenta={ventaSeleccionada}
      />
    </>
  );
}

export default CopiasVistaVentas;
