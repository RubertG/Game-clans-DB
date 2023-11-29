import { ObjectId } from "mongoose"

export class ClanEntity {

  public name: string
  public description: string
  public points: number
  public clanCategory: ObjectId 

  constructor(
    name: string,
    description: string, 
    points: number,
    clanCategory: ObjectId 
  ) {
    this.name = name
    this.description = description
    this.points = points
    this.clanCategory = clanCategory
  }
}