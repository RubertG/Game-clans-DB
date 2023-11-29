import { Request, Response } from "express";
import PlayerCategoryDao from "../dao/PlayerCategoryDao";

class PlayerCategoryController extends PlayerCategoryDao {

  public consult(req: Request, res: Response) {
    PlayerCategoryController.consultPlayerCategory(res);
  }

  public create(req: Request, res: Response) {
    PlayerCategoryController.createPlayerCategory(req.body, res);
  }

  public delete(req: Request, res: Response) {
    PlayerCategoryController.deletePlayerCategory(req.params.namePlayerCategory, res);
  }

  public update(req: Request, res: Response) {
    PlayerCategoryController.updatePlayerCategory(req.params.namePlayerCategory, req.body, res);
  }
}

const playerCategory = new PlayerCategoryController();
export default playerCategory;
