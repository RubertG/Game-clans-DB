import { type Response } from 'express'
import ClanSchema from '../schema/ClanSchema'
import { ClanEntity } from '../entity/ClanEntity'
import { clanCategoryChange, clanPlayers, clanVerification } from '../utils/utilsDao'

class ClanDao {

  // basic consult 
  protected static async consultClan(res: Response): Promise<any> {
    try {
      const clans = await ClanSchema.find()
        .sort({ _id: -1 })
        .populate('clanCategory')
        .exec();

      // Consulta y construcción de la respuesta para cada clan
      const responseData = await Promise.all(clans.map(async (clan) => {
        const players = await clanPlayers(clan._id)

        return {
          _id: clan._id,
          name: clan.name,
          description: clan.description,
          points: clan.points,
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
    try {
      const exists = await ClanSchema.findOne({ name: params.name })
      await clanVerification(params)

      if (exists) {
        res.status(400).json({ response: 'The Clan already exists.' })
      } else {
        const newClan = new ClanSchema(params)
        newClan.save()
          .then(() => res.status(200).json({
            response: 'Clan created successfully.',
            clan: newClan
          }))
          .catch(() => res.status(400).json({ response: 'Clan cannot be created.' }))
      }
    } catch (error: any) {
      res.status(400).json({ response: 'Clan cannot be created.', error: error.message })
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
  protected static async updateClan(key: string, params: ClanEntity, res: Response): Promise<any> {
    try {
      let exists = await ClanSchema.findOne({ name: key }).exec()
      await clanVerification(params)
      
      if (exists) {
        const clanUpdate = await clanCategoryChange(params, exists)
        const result = await ClanSchema.findOneAndUpdate(
          { name: key },
          { $set: clanUpdate },
          { new: true }
        )

        res.status(200).json({ response: 'Clan updated successfully.', updated: result })
      } else {
        exists = await ClanSchema.findOne({ _id: key }).exec()

        if (exists) {
          const clanUpdate = await clanCategoryChange(params, exists)
          const result = await ClanSchema.findOneAndUpdate(
            { _id: key },
            { $set: clanUpdate },
            { new: true }
          )

          res.status(200).json({ response: 'Clan updated successfully.', updated: result })
        } else {
          res.status(400).json({ response: 'Clan not found.' })
        }
      }
    } catch (error: any) {
      res.status(400).json({ response: 'Clan cannot be updated.', error: error.message })
    }
  }

  protected static async searchClan(key: string, res: Response): Promise<any> {
    try {
      let clan = await ClanSchema.findOne({ name: key })
        .populate('clanCategory')
        .exec()

      if (clan) {

        const players = await clanPlayers(clan._id)

        const response = {
          _id: clan._id,
          name: clan.name,
          description: clan.description,
          clanCategory: clan.clanCategory,
          points: clan.points,
          players
        };

        res.status(200).json(response)
      } else {
        clan = await ClanSchema.findOne({ _id: key })
          .populate('clanCategory')
          .exec()


        if (clan) {
          const players = await clanPlayers(clan._id)

          const response = {
            _id: clan._id,
            name: clan.name,
            description: clan.description,
            clanCategory: clan.clanCategory,
            points: clan.points,
            players
          };

          res.status(200).json(response)
        } else {
          res.status(400).json({ response: 'Clan not found.' })
        }
      }
    } catch (error: any) {
      res.status(400).json({ response: 'Clan could not be searched.', error: error.message })
    }
  }
}
export default ClanDao
