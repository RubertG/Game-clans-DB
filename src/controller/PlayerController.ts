import { Request, Response } from "express";
import PlayerDao from "../dao/PlayerDao";

class PlayerControlador extends PlayerDao {

  public consult(req: Request, res: Response) {
    PlayerControlador.consultPlayer(res);
  }

  public create(req: Request, res: Response) {
    PlayerControlador.createPlayer(req.body, res);
  }
  public delete(req: Request, res: Response) {
    PlayerControlador.deletePlayer(req.params.gamertag, res);
  }

  public update(req: Request, res: Response) {
    PlayerControlador.updatePlayer(req.params.gamertag, req.body, res);
  }
}

const playerController = new PlayerControlador();
export default playerController;
