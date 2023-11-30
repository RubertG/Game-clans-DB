import { Router } from "express";
import PlayerController from "../controller/PlayerController";

class PlayerRoute {
  public APIroute: Router;
  constructor() {
    this.APIroute = Router();
    this.rutesConfig();
  };
  public rutesConfig() {
    this.APIroute.get("/", PlayerController.consult);
    this.APIroute.post("/", PlayerController.create);
    this.APIroute.delete("/:key", PlayerController.delete);
    this.APIroute.put("/:key", PlayerController.update);
    this.APIroute.get("/:key", PlayerController.search)
  };
};

const playerRoute = new PlayerRoute();
export default playerRoute.APIroute;
