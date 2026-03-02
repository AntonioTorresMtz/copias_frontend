import { cliente } from "./api";

export default {
  getObtenerMarcas() {
    return cliente.get(`/marcas`);
  },
  postLogin(data) {
    return cliente.post(`/login`, data);
  },
  getObtenerUsuarios() {
    return cliente.get(`/usuarios`);
  },
  postCrearUsuario(data) {
    return cliente.post(`/usuarios/crearUsuario`, data);
  },
  eliminarUsuario(id) {
    return cliente.delete(`/usuarios/${id}`);
  },
  patchActualizarUsuario(id, data) {
    return cliente.patch(`/usuarios/${id}`, data);
  },
  getObtenerServicios() {
    return cliente.get(`/servicios`);
  },
  getObtenerServiciosClave(clave) {
    return cliente.get(`/servicios/buscarServicioClave/${clave}`);
  },
  getObtenerHojas() {
    return cliente.get(`/hojas`);
  },
  getObtenerColores() {
    return cliente.get(`/colores`);
  },
  postInsertarVentaCopias(id, data) {
    return cliente.post(`/ventas/InsertarDetalleVenta/${id}`, data);
  },
  getObtenerVentas() {
    return cliente.get(`/ventas`);
  },
  getObtenerVentasHoy(){
    return cliente.get(`/ventas/obtenerVentas`)
  },
  patchCancelarVena(data) {
    return cliente.patch(`/ventas/cancelarVenta`, data);
  },
  getObtenerDetalleVentas(id) {
    return cliente.get(`ventas/obtenerDetalleVentas/${id}`);
  },
  postObtenerVentasFiltro(data){
    return cliente.post(`/ventas/obtenerVentasFiltrado`, data)
  }
};
