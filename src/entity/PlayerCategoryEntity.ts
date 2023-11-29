export class PlayerCategoryEntity {

  public name: string
  public minPoints: number
  public maxPoints: number

  constructor(
    name: string,
    minPoints: number,
    maxPoints: number
  ) {
    this.name = name
    this.minPoints = minPoints
    this.maxPoints = maxPoints
  }
}