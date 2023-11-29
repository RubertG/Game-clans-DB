import { Router } from "express";
import ClanCategoryController from "../controller/ClanCategoryController";

class ClanCategoryRoute {
  public APIroute: Router;
  constructor() {
    this.APIroute = Router();
    this.rutesConfig();
  };
  public rutesConfig() {
    this.APIroute.get("/", ClanCategoryController.consult);
    this.APIroute.post("/", ClanCategoryController.create);
    this.APIroute.delete("/:nameClanCategory", ClanCategoryController.delete);
    this.APIroute.put("/:nameClanCategory", ClanCategoryController.update);
  };
};

const clanCategoryRoute = new ClanCategoryRoute();
export default clanCategoryRoute.APIroute;
