import { model, Schema } from "mongoose"
import { PlayerEntity } from "../entity/PlayerEntity"

const PlayerSchema = new Schema<PlayerEntity>({
  gamertag: { type: String, required: true, unique: true, index: true, trim: true }, 
  clan: { type: Schema.Types.ObjectId, ref: 'Clan', required: false, default: null  },
  playerCategory: { type: Schema.Types.ObjectId, ref: 'PlayerCategory', required: false, default: null  },
  password: { type: String, required: true, trim: true },
  points: { type: Number, required: false, default: 0 }
}, {
  versionKey: false 
});

export default model("Player", PlayerSchema, "Player")