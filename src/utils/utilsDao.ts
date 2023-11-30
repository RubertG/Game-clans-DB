import { Types } from "mongoose"
import { ClanEntity } from "../entity/ClanEntity"
import { PlayerEntity } from "../entity/PlayerEntity"
import ClanCategorySchema from "../schema/ClanCategorySchema"
import ClanSchema from "../schema/ClanSchema"
import PlayerCategorySchema from "../schema/PlayerCategorySchema"
import PlayerSchema from "../schema/PlayerSchema"

export async function clanPlayers(id: Types.ObjectId) {
  const clanPlayers = await PlayerSchema.find({ clan: id })
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

  return players
}

export async function playerVerification(params: PlayerEntity) {
  const existClan = await ClanSchema.findOne({ _id: params.clan }).exec()
  const existCategory = await PlayerSchema.findOne({ _id: params.playerCategory }).exec()

  if (!existClan && typeof params.clan === 'string') {
    throw new Error('The specified clan does not exist.')
  }

  if (!existCategory && typeof params.playerCategory === 'string') {
    throw new Error('The specified player category does not exist.')
  }
}

export async function playerCategoryChange(player: PlayerEntity, prevPlayer: PlayerEntity) {
  const playerCategory = await PlayerCategorySchema.find()
  const { points } = player
  const { points: prevPoints } = prevPlayer
  let playerUpdated

  if (!points) {
    for (const pC of playerCategory) {
      if (prevPoints >= pC.minPoints && prevPoints <= pC.maxPoints) {
        playerUpdated = { ...player, playerCategory: pC._id }
        return playerUpdated
      }
    }
  }
  if (points < 0) throw new Error('Points cannot be negative.')

  for (const pC of playerCategory) {
    if (points >= pC.minPoints && points <= pC.maxPoints) {
      playerUpdated = { ...player, playerCategory: pC._id }
      return playerUpdated
    }
  }

  playerUpdated = { ...player, playerCategory: null }
  return playerUpdated
}

export async function playerCategoryPlayers(id: Types.ObjectId) {
  const categoryPlayers = await PlayerSchema.find({ playerCategory: id })
    .sort({ points: 'descending' })
    .populate('clan')
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

  return players
}

export async function clanVerification(params: ClanEntity) {
  const existClanCategory = await ClanCategorySchema.findOne({ _id: params.clanCategory })
    .exec()

  if (!existClanCategory && typeof params.clanCategory === 'string') {
    throw new Error('The specified clan category does not exist.')
  }
}

export async function clanCategoryChange(clan: ClanEntity, prevClan: ClanEntity) {
  const clanCategory = await ClanCategorySchema.find()
  const { points } = clan
  const { points: prevPoints } = prevClan
  let clanUpdated

  if (!points) {
    for (const pC of clanCategory) {
      if (prevPoints >= pC.minPoints && prevPoints <= pC.maxPoints) {
        clanUpdated = { ...clan, clanCategory: pC._id }
        return clanUpdated
      }
    }
  }
  if (points < 0) throw new Error('Points cannot be negative.')

  for (const pC of clanCategory) {
    if (points >= pC.minPoints && points <= pC.maxPoints) {
      clanUpdated = { ...clan, clanCategory: pC._id }
      return clanUpdated
    }
  }

  clanUpdated = { ...clan, clanCategory: null }
  return clanUpdated
}

export async function clanCategoryClans(id: Types.ObjectId) {
  const categoryClans = await ClanSchema.find({ clanCategory: id })
    .sort({ points: 'descending' })
    .populate('clanCategory')
    .limit(5)
    .exec()

  const clans = await Promise.all(categoryClans.map(async (clan) => {
    const players = await clanPlayers(clan._id)

    return {
      _id: clan._id,
      name: clan.name,
      description: clan.description,
      points: clan.points,
      players
    }
  }))

  return clans
}

