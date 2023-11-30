import { Request, Response } from "express";
import PlayerDao from "../dao/PlayerDao";

class PlayerController extends PlayerDao {

  public consult(req: Request, res: Response) {
    PlayerController.consultPlayer(res);
  }

  public create(req: Request, res: Response) {
    PlayerController.createPlayer(req.body, res);
  }
  public delete(req: Request, res: Response) {
    PlayerController.deletePlayer(req.params.key, res);
  }

  public update(req: Request, res: Response) {
    PlayerController.updatePlayer(req.params.key, req.body, res);
  }

  public search(req: Request, res: Response) {
    PlayerController.searchPlayer(req.params.key, res);
  }
}

const playerController = new PlayerController();
export default playerController;
