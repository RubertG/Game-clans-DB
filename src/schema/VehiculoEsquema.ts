import { VehiculoEntidad } from '../entity/VehiculoEntidad';
import { model, Schema } from "mongoose";


const VehiculoEsquema = new Schema<VehiculoEntidad>({
  placa: { type: String, required: true, unique: true, trim: true },
  color: { type: String, required: true, unique: true, trim: true },
},{versionKey:false});

export default model("Veehiculo",VehiculoEsquema,"Vehiculo1");