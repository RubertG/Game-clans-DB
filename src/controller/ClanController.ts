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
    ClanController.deleteClan(req.params.key, res);
  }

  public update(req: Request, res: Response) {
    ClanController.updateClan(req.params.key, req.body, res);
  }
 
  public search(req: Request, res: Response) {
    ClanController.searchClan(req.params.key, res);
  }
}

const clan = new ClanController();
export default clan;
