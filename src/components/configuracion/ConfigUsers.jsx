import React from "react";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import catalogo from "../../servicios/catalogo";
import { useState, useEffect } from "react";
import ConfigAddUser from "./ConfigAddUser";
import ConfigUpdateUser from "./ConfigUpdateUser";

function ConfigUsers() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const TABLE_HEAD = [
    { name: "Usuario", selector: (row) => row.nombre_usuario, sortable: true },
    { name: "Nombre real", selector: (row) => row.nombre_real },
    { name: "Permisos", selector: (row) => row.permisos },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex flex-row">
          <PencilIcon
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

  const handleEdit = (row) => {
    setUsuarioSeleccionado(row);
    console.log(usuarioSeleccionado);
    setIsModalUpdOpen(true);
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este usuario?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Borrar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        eliminarUsuario(row.PK_usuario);
      } else if (result.isDenied) {
        Swal.fire("No se elimino el usuario", "", "info");
      }
    });
  };

  const eliminarUsuario = async (id) => {
    try {
      const response = await catalogo.eliminarUsuario(id);
      if (response.data.codigo == 201) {
        Swal.fire("Eliminado con exito", "", "success");
        obtenerUsuarios();
      } else {
        console.log(response.data.errors);
      }
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };

  const [usuarios, setUsuarios] = useState([]);
  const [nombresUsuarios, setNombresUsuarios] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdOpen, setIsModalUpdOpen] = useState(false);

  const openModal = () => {
    setIsModalAddOpen(true);
  };

  const closeModal = () => {
    setIsModalAddOpen(false);
  };

  const nuevaTabla = () => {
    setIsModalAddOpen(false);
    setIsModalUpdOpen(false);
    obtenerUsuarios();
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await catalogo.getObtenerUsuarios();
      const usuariosData = response.data.data; // Guarda los datos en una variable temporal
      setUsuarios(usuariosData);
      setNombresUsuarios(usuariosData.map((usuario) => usuario.nombre_usuario)); // Usa la variable temporal
    } catch (error) {
      console.error("Error al cargar los datos", error.response.data);
    }
  };
  useEffect(() => {
    obtenerUsuarios(); // Llamar la función
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
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button
                  onClick={openModal}
                  className="flex items-center gap-3"
                  size="sm"
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar
                  Usuario
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <DataTable
              columns={TABLE_HEAD}
              data={usuarios}
              pagination
              paginationPerPage={4}
            />
          </CardBody>
        </Card>
      </div>
      <ConfigAddUser
        isOpen={isModalAddOpen}
        onClose={nuevaTabla}
        listaUsuarios={nombresUsuarios}
      ></ConfigAddUser>
      <ConfigUpdateUser
        isOpen={isModalUpdOpen}
        onClose={nuevaTabla}
        listaUsuarios={nombresUsuarios}
        userData={usuarioSeleccionado}
      />
    </>
  );
}

export default ConfigUsers;
