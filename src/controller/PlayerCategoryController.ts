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
    PlayerCategoryController.deletePlayerCategory(req.params.key, res);
  }

  public update(req: Request, res: Response) {
    PlayerCategoryController.updatePlayerCategory(req.params.key, req.body, res);
  }

  public search(req: Request, res: Response) {
    PlayerCategoryController.searchPlayerCategory(req.params.key, res);
  }
}

const playerCategory = new PlayerCategoryController();
export default playerCategory;
