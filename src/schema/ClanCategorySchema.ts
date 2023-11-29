import { model, Schema } from "mongoose";
import { ClanCategoryEntity } from "../entity/ClanCategoryEntity";

const ClanCategorySchema = new Schema<ClanCategoryEntity>({
  name: { type: String, required: true, unique: true, trim: true },
  maxPoints: { type: Number, required: true },
  minPoints: { type: Number, required: true }
}, {
  versionKey: false 
  // significa que has desactivado explícitamente la adición del campo __v en los documentos creados a partir de este esquema. Esto podría ser útil si no necesitas el control de versiones.
});

// model("model name", schema, "collection name") 
export default model("ClanCategory", ClanCategorySchema, "ClanCategory")