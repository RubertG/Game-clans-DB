import { Request, Response } from "express";
import ClanDao from "../dao/ClanDao";

class ClanController extends ClanDao {

  public consult(req: Request, res: Response) {
    ClanController.consultClan(res);
  }

  public create(req: Request, res: Response) {
    ClanController.createClan(req.body, res);
  }

  public delete(req: Request, res: Response) {
    ClanController.deleteClan(req.params.nameClan, res);
  }

  public update(req: Request, res: Response) {
    ClanController.updateClan(req.params.nameClan, req.body, res);
  }
}

const clan = new ClanController();
export default clan;
