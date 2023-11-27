import { Router } from "express";
import vehiculoControlador from "../controller/VehiculoControlador";
class VehiculoRuta {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.configurarRutas();
  };
  public configurarRutas() {
    this.rutaApi.get("/listado", vehiculoControlador.consulta);
    this.rutaApi.post("/crear", vehiculoControlador.crear);

  };
};

const vehiculoRuta = new VehiculoRuta();
export default vehiculoRuta.rutaApi;

