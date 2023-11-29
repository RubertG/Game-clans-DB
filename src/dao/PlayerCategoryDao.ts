import { type Response } from 'express'
import PlayerCategorySchema from '../schema/PlayerCategorySchema'
import { PlayerCategoryEntity } from '../entity/PlayerCategoryEntity'
import PlayerSchema from '../schema/PlayerSchema'

class PlayerCategoryDao {

  // basic consult 
  protected static async consultPlayerCategory(res: Response): Promise<any> {
    try {
      const playersCategories = await PlayerCategorySchema.find().sort({ minPoints: 'ascending' })

      const responseData = await Promise.all(playersCategories.map(async (pc) => {
        const categoryPlayers = await PlayerSchema.find({ playerCategory: pc._id })
          .sort({ points: 'descending' })
          .populate('playerCategory', 'name minPoints maxPoints')
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
          _id: pc._id,
          name: pc.name,
          minPoints: pc.minPoints,
          maxPoints: pc.maxPoints,
          players
        }
      }))

      res.status(200).json(responseData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // create player
  protected static async createPlayerCategory(params: PlayerCategoryEntity, res: Response): Promise<any> {
    const exists = await PlayerCategorySchema.findOne(params)

    if (exists) {
      res.status(400).json({ response: 'The player category already exists.' })
    } else {
      const newPlayerCategory = new PlayerCategorySchema(params)
      newPlayerCategory.save()
        .then(() => res.status(200).json({
          response: 'Player category created successfully.',
          playerCategory: newPlayerCategory
        }))
        .catch(() => res.status(400).json({
          response: 'Player category cannot be created.'
        }))
    }
  }

  // delete player
  protected static async deletePlayerCategory(key: string, res: Response): Promise<any> {
    let exists = await PlayerCategorySchema.findOne({ name: key }).exec()

    try {
      if (exists) {
        const result = await PlayerCategorySchema.deleteOne({ name: key })
        res.status(200).json({
          response: 'Player category deleted successfully.',
          deleted: result
        })
      } else {
        exists = await PlayerCategorySchema.findById(key).exec()
        console.log("object");
        if (exists) {
          const result = await PlayerCategorySchema.deleteOne({ _id: key })
          res.status(200).json({
            response: 'Player category deleted successfully.',
            deleted: result
          })
        } else {
          res.status(400).json({ response: 'Player category not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Player category cannot be deleted.' })
    }
  }

  // update player 
  protected static async updatePlayerCategory(namePlayerCategory: string, params: any, res: Response): Promise<any> {
    const exists = await PlayerCategorySchema.find({ name: namePlayerCategory }).exec()

    if (exists) {
      try {
        const result = await PlayerCategorySchema.findOneAndUpdate(
          { name: namePlayerCategory },
          { $set: params }
        )
        res.status(200).json({
          response: 'Player category updated successfully.',
          updated: result
        })
      } catch (error) {
        res.status(400).json({ response: 'Player category cannot be updated.' })
      }
    } else {
      res.status(400).json({ response: 'Player category not found.' })
    }
  }
}
export default PlayerCategoryDao
