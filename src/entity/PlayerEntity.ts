import { ObjectId } from "mongoose"

export class PlayerEntity {

  public gamertag: string
  public points: number
  public playerCategory: ObjectId
  public clan: ObjectId

  constructor(
    gamertag: string,
    points: number,
    playerCategory: ObjectId,
    clan: ObjectId,
  ) {
    this.gamertag = gamertag
    this.points = points
    this.playerCategory = playerCategory
    this.clan = clan
  }
}