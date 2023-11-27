import { model, Schema } from "mongoose";
import PerfilEntidad from "../entity/PerfilEntidad";

const PerfilEsquema = new Schema<PerfilEntidad>({
  nombrePerfil: { type: String, required: true, unique: true, trim: true },
}, { versionKey: false });

export default model("Perrfil", PerfilEsquema, "Perfil")