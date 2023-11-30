import { type Response } from 'express'
import PlayerSchema from '../schema/PlayerSchema'
import { PlayerEntity } from '../entity/PlayerEntity'
import { playerCategoryChange, playerVerification } from '../utils/utilsDao'

interface TypeQuery {
  clan?: string
  category?: string
}

class PlayerDao {
  // basic consult 
  protected static async consultPlayer(res: Response): Promise<any> {
    try {
      const data = await PlayerSchema.find().sort({ _id: -1 })
        .populate('clan')
        .populate('playerCategory')
        .exec();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // create player
  protected static async createPlayer(params: PlayerEntity, res: Response): Promise<any> {
    try {
      const exists = await PlayerSchema.findOne(params)
      await playerVerification(params)

      if (exists) {
        res.status(400).json({ response: 'The player already exists.' })
      } else {
        const newPlayer = new PlayerSchema(params)
        newPlayer.save()
          .then(() => res.status(200).json({
            response: 'Player created successfully.',
            player: newPlayer
          }))
          .catch(() => res.status(400).json({ response: 'Player cannot be created.' }))
      }
    } catch (error: any) {
      res.status(400).json({ response: 'Player cannot be created.', error: error.message })
    }
  }

  // delete player
  protected static async deletePlayer(key: string, res: Response): Promise<any> {
    try {
      let exists = await PlayerSchema.findOne({ gamertag: key }).exec()

      if (exists) {
        const result = await PlayerSchema.deleteOne({ gamertag: key })
        res.status(200).json({ response: 'Player deleted successfully.', deleted: result })
      } else {
        exists = await PlayerSchema.findOne({ _id: key }).exec()

        if (exists) {
          const result = await PlayerSchema.deleteOne({ _id: key })
          res.status(200).json({ response: 'Player deleted successfully.', deleted: result })
        } else {
          res.status(400).json({ response: 'Player not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Player cannot be deleted.' })
    }
  }

  // update player 
  protected static async updatePlayer(key: string, params: any, res: Response): Promise<any> {
    try {
      let exists = await PlayerSchema.findOne({ gamertag: key }).exec()
      await playerVerification(params)

      if (exists) {
        const playerUpdated = await playerCategoryChange(params, exists)
        const result = await PlayerSchema.findOneAndUpdate(
          { gamertag: key },
          { $set: playerUpdated },
          { new: true }
        )
        res.status(200).json({
          response: 'Player updated successfully.',
          updated: result
        })
      } else {
        exists = await PlayerSchema.findOne({ _id: key }).exec()

        if (exists) {
          const playerUpdated = await playerCategoryChange(params, exists)
          const result = await PlayerSchema.findOneAndUpdate(
            { _id: key },
            { $set: playerUpdated },
            { new: true }
          )
          res.status(200).json({
            response: 'Player updated successfully.',
            updated: result
          })
        } else {
          res.status(400).json({ response: 'Player not found.' })
        }
      }
    } catch (error: any) {
      res.status(400).json({ response: 'Player cannot be updated.', error: error.message })
    }
  }

  // search player 
  protected static async searchPlayer(key: string, res: Response): Promise<any> {
    try {
      let player = await PlayerSchema.findOne({ gamertag: key })
        .populate('clan')
        .populate('playerCategory')
        .exec()

      if (player) {
        res.status(200).json(player)
      } else {
        player = await PlayerSchema.findOne({ _id: key })
          .populate('clan')
          .populate('playerCategory')
          .exec()

        if (player) {
          res.status(200).json(player)
        } else {
          res.status(400).json({ response: 'Player not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Player could not be searched.' })
    }
  }

  // filter by category
  protected static async filterPlayers(query: TypeQuery, res: Response): Promise<any> {
    try {
      let data = null
      if (query.category) {
        data = await PlayerSchema.find({ playerCategory: query.category })
          .sort({ _id: -1 })
          .populate('clan')
          .populate('playerCategory')
          .exec();
      } else if (query.clan)  {
        data = await PlayerSchema.find({ clan: query.clan })
          .sort({ _id: -1 })
          .populate('clan')
          .populate('playerCategory')
          .exec();
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ response: 'filter was not applied.' })
    }
  }
}

export default PlayerDao
