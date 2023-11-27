import { Request, Response } from "express";
import VehiculoDao from "../dao/VehiculoDao";

class VehiculoControlador extends VehiculoDao {
  
  public consulta(req: Request, res: Response) {
    VehiculoControlador.consultarVehiculos(res);
  }

  public crear(req: Request, res: Response) {
    VehiculoControlador.crearVehiculos(req.body,res);
  }
  
}

const vehiculoControlador = new VehiculoControlador();
export default vehiculoControlador;
