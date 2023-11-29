import { Request, Response } from "express";
import ClanCategoryDao from "../dao/ClanCategoryDao";

class ClanCategoryController extends ClanCategoryDao {

  public consult(req: Request, res: Response) {
    ClanCategoryController.consultClanCategory(res);
  }

  public create(req: Request, res: Response) {
    ClanCategoryController.createClanCategory(req.body, res);
  }

  public delete(req: Request, res: Response) {
    ClanCategoryController.deleteClanCategory(req.params.nameClanCategory, res);
  }

  public update(req: Request, res: Response) {
    ClanCategoryController.updateClanCategory(req.params.nameClanCategory, req.body, res);
  }
}

const clanCategory = new ClanCategoryController();
export default clanCategory;
