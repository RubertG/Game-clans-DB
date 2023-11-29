import { type Response } from 'express'
import ClanCategorySchema from '../schema/ClanCategorySchema'
import { ClanCategoryEntity } from '../entity/ClanCategoryEntity'
import ClanSchema from '../schema/ClanSchema'
import PlayerSchema from '../schema/PlayerSchema'

class ClanCategoryDao {

  // basic consult 
  protected static async consultClanCategory(res: Response): Promise<any> {
    try {
      const clanCategories = await ClanCategorySchema.find().sort({ minPoints: 'ascending' })

      const responseData = await Promise.all(clanCategories.map(async (c) => {
        const categoryClans = await ClanSchema.find({ clanCategory: c._id })
          .sort({ points: 'descending' })
          .populate('clanCategory')
          .limit(5)
          .exec()

        const clans = await Promise.all(categoryClans.map(async (clan) => {
          const categoryPlayers = await PlayerSchema.find({ clan: clan._id })
            .sort({ points: 'descending' })
            .populate('playerCategory')
            .limit(5)
            .exec()

          const players = categoryPlayers.map((player) => {
            return {
              _id: player._id,
              gamertag: player.gamertag,
              points: player.points,
              clan: player.clan
            }
          })

          return {
            _id: clan._id,
            name: clan.name,
            description: clan.description,
            points: clan.points,
            players
          }
        }))

        return {
          _id: c._id,
          name: c.name,
          minPoints: c.minPoints,
          maxPoints: c.maxPoints,
          clans
        }
      }))

      res.status(200).json(responseData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // create Clan
  protected static async createClanCategory(params: ClanCategoryEntity, res: Response): Promise<any> {
    const exists = await ClanCategorySchema.findOne(params)

    if (exists) {
      res.status(400).json({ response: 'The Clan category already exists.' })
    } else {
      const newClanCategory = new ClanCategorySchema(params)
      newClanCategory.save()
        .then(() => res.status(200).json({
          response: 'Clan category created successfully.',
          Clan: newClanCategory
        }))
        .catch(() => res.status(400).json({
          response: 'Clan category cannot be created.'
        }))
    }
  }

  // delete Clan
  protected static async deleteClanCategory(key: string, res: Response): Promise<any> {
    let exists = await ClanCategorySchema.findOne({ name: key }).exec()

    try {
      if (exists) {
        const result = await ClanCategorySchema.deleteOne({ name: key })
        res.status(200).json({ response: 'Clan deleted successfully.', deleted: result })
      } else {
        exists = await ClanCategorySchema.findById(key).exec()
        if (exists) {
          const result = await ClanCategorySchema.deleteOne({ _id: key })
          res.status(200).json({ response: 'Clan deleted successfully.', deleted: result })
        } else {
          res.status(400).json({ response: 'Clan category not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Clan cannot be deleted.' })
    }
  }

  // update Clan 
  protected static async updateClanCategory(nameClanCategory: string, params: any, res: Response): Promise<any> {
    const exists = await ClanCategorySchema.find({ name: nameClanCategory }).exec()

    if (exists) {
      try {
        const result = await ClanCategorySchema.findOneAndUpdate(
          { name: nameClanCategory },
          { $set: params }
        )
        res.status(200).json({
          response: 'Clan category updated successfully.',
          updated: result
        })
      } catch (error) {
        res.status(400).json({ response: 'Clan category cannot be updated.' })
      }
    } else {
      res.status(400).json({ response: 'Clan category not found.' })
    }
  }
}
export default ClanCategoryDao
