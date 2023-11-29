import { ClanEntity } from "../entity/ClanEntity"
import { PlayerEntity } from "../entity/PlayerEntity"
import ClanCategorySchema from "../schema/ClanCategorySchema"
import ClanSchema from "../schema/ClanSchema"
import PlayerCategorySchema from "../schema/PlayerCategorySchema"

export async function playerVerification(params: PlayerEntity) {
  let clanExists
  let categoryExists
  const { clan, playerCategory } = params

  if (clan != null) {
    clanExists = null
  }

  if (playerCategory != null) {
    categoryExists = null
  }

  if (typeof clan === 'string') {
    clanExists = await ClanSchema.findById(clan)
  } 

  if (typeof playerCategory === 'string') {
    categoryExists = await PlayerCategorySchema.findById(playerCategory)
  }

  return {
    categoryExists,
    clanExists
  }
}

export async function clanVerification(params: ClanEntity) {
  let categoryExists
  const { clanCategory } = params
  if (typeof clanCategory === 'string') {
    categoryExists = await ClanCategorySchema.findById(clanCategory)
  } 

  return {
    categoryExists
  }
}