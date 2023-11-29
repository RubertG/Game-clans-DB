import { Router } from "express";
import ClanController from "../controller/ClanController";

class ClanRoute {
  public APIroute: Router;
  constructor() {
    this.APIroute = Router();
    this.rutesConfig();
  };
  public rutesConfig() {
    this.APIroute.get("/", ClanController.consult);
    this.APIroute.post("/", ClanController.create);
    this.APIroute.delete("/:nameClan", ClanController.delete);
    this.APIroute.put("/:nameClan", ClanController.update);
  };
};

const clanRoute = new ClanRoute();
export default clanRoute.APIroute;
