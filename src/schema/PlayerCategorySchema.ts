import { model, Schema } from "mongoose";
import { PlayerCategoryEntity } from "../entity/PlayerCategoryEntity";

const PlayerCategorySchema = new Schema<PlayerCategoryEntity>({
  name: { type: String, required: true, unique: true, trim: true },
  maxPoints: { type: Number, required: true },
  minPoints: { type: Number, required: true }
}, {
  versionKey: false 
});

export default model("PlayerCategory", PlayerCategorySchema, "PlayerCategory")