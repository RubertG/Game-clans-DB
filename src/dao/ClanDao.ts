import { type Response } from 'express'
import ClanSchema from '../schema/ClanSchema'
import { ClanEntity } from '../entity/ClanEntity'
import { clanVerification } from '../utils/verificationsValuesDao'
import PlayerSchema from '../schema/PlayerSchema';

class ClanDao {

  // basic consult 
  protected static async consultClan(res: Response): Promise<any> {
    try {
      const clans = await ClanSchema.find().sort({ _id: -1 }).populate('clanCategory').exec();

      // Consulta y construcción de la respuesta para cada clan
      const responseData = await Promise.all(clans.map(async (clan) => {
        const clanPlayers = await PlayerSchema.find({ clan: clan._id })
          .sort({ points: -1 })
          .limit(5)
          .populate('playerCategory')
          .exec();

        const players = clanPlayers.map((player) => ({
          _id: player._id,
          gamertag: player.gamertag,
          points: player.points,
          idCategory: player.playerCategory,
        }))

        return {
          _id: clan._id,
          name: clan.name,
          description: clan.description,
          clanCategory: clan.clanCategory,
          players
        };
      }));

      res.status(200).json(responseData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // create Clan
  protected static async createClan(params: ClanEntity, res: Response): Promise<any> {
    const exists = await ClanSchema.findOne(params)
    if (exists) {
      res.status(400).json({ response: 'The Clan already exists.' })
    } else {
      const { categoryExists } = await clanVerification(params)

      if (!categoryExists && typeof categoryExists !== "undefined") {
        res.status(404).json({ mensaje: 'The specified clan category does not exist.' });
      } else {
        const newClan = new ClanSchema(params)
        newClan.save()
          .then(() => res.status(200).json({
            response: 'Clan created successfully.',
            clan: newClan
          }))
          .catch(() => res.status(400).json({ response: 'Clan cannot be created.' }))
      }
    }
  }

  // delete Clan
  protected static async deleteClan(key: string, res: Response): Promise<any> {
    let exists = await ClanSchema.findOne({ name: key }).exec()

    try {
      if (exists) {
        const result = await ClanSchema.deleteOne({ name: key })
        res.status(200).json({ response: 'Clan deleted successfully.', deleted: result })
      } else {
        exists = await ClanSchema.findById(key).exec()
        if (exists) {
          const result = await ClanSchema.deleteOne({ _id: key })
          res.status(200).json({ response: 'Clan deleted successfully.', deleted: result })
        } else {
          res.status(400).json({ response: 'Clan not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Clan cannot be deleted.' })
    }
  }

  // update Clan 
  protected static async updateClan(nameClan: string, params: any, res: Response): Promise<any> {
    const exists = await ClanSchema.find({ name: nameClan }).exec()

    if (exists) {
      try {
        const result = await ClanSchema.findOneAndUpdate(
          { gamertag: nameClan },
          { $set: params }
        )
        res.status(200).json({ response: 'Clan updated successfully.', updated: result })
      } catch (error) {
        res.status(400).json({ response: 'Clan cannot be updated.' })
      }
    } else {
      res.status(400).json({ response: 'Clan not found.' })
    }
  }
}
export default ClanDao
