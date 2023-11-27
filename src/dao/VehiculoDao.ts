import { Response } from "express";
import VehiculoEsquema from "../schema/VehiculoEsquema";



class VehiculoDao {
  protected static async consultarVehiculos(res: Response): Promise<any> 
  {
    const datos = await VehiculoEsquema.find().sort({ _id:-1 });
    res.status(200).json(datos);
  }

  protected static async crearVehiculos(parametros: any, res:Response): Promise<any> {
    const existe = await VehiculoEsquema.findOne(parametros);
    if (existe) {
      res.status(400).json({respuesta: "El registro ya existe...."});
    } else {
      const objVehiculo=new VehiculoEsquema(parametros);
      objVehiculo.save()
      .then(()=>res.status(200).json({respuesta:"Perfil creado exitosamente"}))
      .catch(()=>res.status(400).json({respuesta:"No se puede crear el perfil"}))
    }
  }
}
export default VehiculoDao;
