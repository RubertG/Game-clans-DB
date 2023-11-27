import { Response } from "express";
import PerfilEsquema from "../schema/PerfilEsquema";


class PerfilDao {
  protected static async consultarPerfiles(res: Response): Promise<any> {
    const datos = await PerfilEsquema.find().sort({ _id: -1 });
    res.status(200).json(datos);
  }

  protected static async crearPerfiles(parametros: any, res: Response): Promise<any> {
    const existe = await PerfilEsquema.findOne(parametros);
    if (existe) {
      res.status(400).json({ respuesta: "El registro ya existe...." });
    } else {
      const objPerfil = new PerfilEsquema(parametros);
      objPerfil.save()
        .then(() => res.status(200).json({ respuesta: "Perfil creado exitosamente" }))
        .catch(() => res.status(400).json({ respuesta: "No se puede crear el perfil" }))
    }
  }

  protected static async eliminarPerfil(identificador: any, res: Response): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      try {
        const resultado = await PerfilEsquema.findByIdAndDelete(identificador)
        res.status(200).json({ respuesta: "Breve ya se Elimino todo bien ", eliminado: resultado })
      } catch (error) {
        res.status(400).json({ respuesta: "No se puede Eliminar socio paila" })
      }
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe yuca " })
    }
  }


  protected static async actualizarPerfil(identificador: any, parametros: any, res: Response): Promise<any> {
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      try {
        const resultado = await PerfilEsquema.findByIdAndUpdate(
          { _id: identificador },
          { $set: parametros }
        )
        res.status(200).json({ respuesta: "Perfil actualizado exitosamente", actualizado: resultado });
      } catch (error) {
        res.status(400).json({ respuesta: "No se puede actualizar el perfil" });
      }
    } else {
      res.status(400).json({ respuesta: "No existe el perfil" });
    }
  }
}
export default PerfilDao;
