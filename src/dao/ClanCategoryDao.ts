import { type Response } from 'express'
import ClanCategorySchema from '../schema/ClanCategorySchema'
import { ClanCategoryEntity } from '../entity/ClanCategoryEntity'

class ClanCategoryDao {

  // basic consult 
  protected static async consultClanCategory(res: Response): Promise<any> {
    const data = await ClanCategorySchema.find().sort({ minPoints: 'ascending' })
    res.status(200).json(data)
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
