import { Request, Response } from "express";
import PerfilDao from "../dao/PerfilDao";

class PerfilControlador extends PerfilDao {
  
  public consulta(req: Request, res: Response) {
    PerfilControlador.consultarPerfiles(res);
  }

  public crear(req: Request, res: Response) {
    PerfilControlador.crearPerfiles(req.body,res);
  }
  public eliminar(req: Request, res: Response) {
    PerfilControlador.eliminarPerfil(req.params.codiguito,res);
  }

  public actualizar(req: Request, res: Response) {
    PerfilControlador.actualizarPerfil(req.params.codiguito,req.body,res);
  }
}

const perfilControlador = new PerfilControlador();
export default perfilControlador;
