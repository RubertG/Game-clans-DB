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
    this.APIroute.delete("/:key", ClanController.delete);
    this.APIroute.put("/:key", ClanController.update);
    this.APIroute.get("/:key", ClanController.search);
  };
};

const clanRoute = new ClanRoute();
export default clanRoute.APIroute;
