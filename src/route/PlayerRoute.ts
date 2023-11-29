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
    this.APIroute.delete("/:gamertag", PlayerController.delete);
    this.APIroute.put("/:gamertag", PlayerController.update);
  };
};

const playerRoute = new PlayerRoute();
export default playerRoute.APIroute;
