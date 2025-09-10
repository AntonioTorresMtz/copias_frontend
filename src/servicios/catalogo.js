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
};
