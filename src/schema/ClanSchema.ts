import { model, Schema } from "mongoose"
import { ClanEntity } from "../entity/ClanEntity";

const ClanSquema = new Schema<ClanEntity>({
  name: { type: String, required: true, unique: true, trim: true, index: true },
  description: { type: String, required: true, trim: true },
  clanCategory: { type: Schema.Types.ObjectId, ref: 'ClanCategory', required: false, default: null },
  points: { type: Number, required: false, default: 0 }
}, {
  versionKey: false 
});

export default model("Clan", ClanSquema, "Clan")