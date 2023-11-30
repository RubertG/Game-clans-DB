import { type Response } from 'express'
import ClanCategorySchema from '../schema/ClanCategorySchema'
import { ClanCategoryEntity } from '../entity/ClanCategoryEntity'
import { clanCategoryClans } from '../utils/utilsDao'

class ClanCategoryDao {

  // basic consult 
  protected static async consultClanCategory(res: Response): Promise<any> {
    try {
      const clanCategories = await ClanCategorySchema.find().sort({ minPoints: 'ascending' })

      const responseData = await Promise.all(clanCategories.map(async (c) => {
        const clans = await clanCategoryClans(c._id)

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

  // update Clan category
  protected static async updateClanCategory(key: string, params: any, res: Response): Promise<any> {
    try {
      let exists = await ClanCategorySchema.findOne({ name: key }).exec()
      
      if (exists) {
        const result = await ClanCategorySchema.findOneAndUpdate(
          { name: key },
          { $set: params },
          { new: true }
        )
        res.status(200).json({
          response: 'Clan category updated successfully.',
          updated: result
        })
      } else {
        exists = await ClanCategorySchema.findOne({ _id: key }).exec()

        if (exists) {
          const result = await ClanCategorySchema.findOneAndUpdate(
            { _id: key },
            { $set: params },
            { new: true }
          )
          res.status(200).json({
            response: 'Clan category updated successfully.',
            updated: result
          })
        } else {
          res.status(400).json({ response: 'Clan category not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Clan category cannot be updated.' })
    }
  }

  // search clan category
  protected static async searchClanCategory(key: string, res: Response): Promise<any> {
    try {
      let pc = await ClanCategorySchema.findOne({ name: key }).exec()

      if (pc) {
        const clans = await clanCategoryClans(pc._id)
        const response = {
          _id: pc._id,
          name: pc.name,
          minPoints: pc.minPoints,
          maxPoints: pc.maxPoints,
          clans
        }
        res.status(200).json(response)
      } else {
        pc = await ClanCategorySchema.findOne({ _id: key }).exec()
        if (pc) {
          const clans = await clanCategoryClans(pc._id)
          const response = {
            _id: pc._id,
            name: pc.name,
            minPoints: pc.minPoints,
            maxPoints: pc.maxPoints,
            clans
          }
          res.status(200).json(response)
        } else {
          res.status(400).json({ response: 'Clan category not found.' })
        }
      }
    } catch (error) {
      res.status(400).json({ response: 'Clan category could not be searched.' })
    }
  }
}

export default ClanCategoryDao
