import { type Response } from 'express'
import PlayerSchema from '../schema/PlayerSchema'
import { PlayerEntity } from '../entity/PlayerEntity'
import { playerVerification } from '../utils/verificationsValuesDao'

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
    const exists = await PlayerSchema.findOne(params)
    if (exists) {
      res.status(400).json({ response: 'The player already exists.' })
    } else {
      const { categoryExists, clanExists } = await playerVerification(params)

      if (
        !clanExists && !categoryExists
        && (typeof clanExists !== 'undefined'
          || typeof categoryExists !== 'undefined')
      ) {
        res.status(404).json({ message: 'The specified clan or category does not exist.' });
      } else {
        const newPlayer = new PlayerSchema(params)
        newPlayer.save()
          .then(() => res.status(200).json({
            response: 'Player created successfully.',
            player: newPlayer
          }))
          .catch(() => res.status(400).json({ response: 'Player cannot be created.' }))
      }
    }
  }

  // delete player
  protected static async deletePlayer(gamertag: string, res: Response): Promise<any> {
    const exists = await PlayerSchema.findOne({ gamertag }).exec()

    if (exists) {
      try {
        const result = await PlayerSchema.deleteOne({ gamertag })
        res.status(200).json({ response: 'Player deleted successfully.', deleted: result })
      } catch (error) {
        res.status(400).json({ response: 'Player cannot be deleted.' })
      }
    } else {
      res.status(400).json({ response: 'Player not found.' })
    }
  }

  // update player 
  protected static async updatePlayer(gamertag: string, params: any, res: Response): Promise<any> {
    const exists = await PlayerSchema.find({ gamertag }).exec()

    if (exists) {
      try {
        const result = await PlayerSchema.findOneAndUpdate(
          { gamertag },
          { $set: params }
        )
        res.status(200).json({ response: 'Player updated successfully.', updated: result })
      } catch (error) {
        res.status(400).json({ response: 'Player cannot be updated.' })
      }
    } else {
      res.status(400).json({ response: 'Player not found.' })
    }
  }
}
export default PlayerDao
