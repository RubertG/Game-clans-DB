import { Router } from "express";
import perfilControlador from "../controller/PerfilControlador";
class PerfilRuta {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.configurarRutas();
  };
  public configurarRutas() {
    this.rutaApi.get("/listado", perfilControlador.consulta);
    this.rutaApi.post("/crear", perfilControlador.crear);
    this.rutaApi.delete("/eliminar/:codiguito", perfilControlador.eliminar);
    this.rutaApi.put("/actualizar/:codiguito", perfilControlador.actualizar);
  };
};

const perfilRuta = new PerfilRuta();
export default perfilRuta.rutaApi;
