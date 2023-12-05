import { Router } from "express";
import PlayerController from "../controller/PlayerController";
import Segurity from "../middleware/Segurity";

class PlayerRoute {
  public APIroute: Router;
  constructor() {
    this.APIroute = Router();
    this.rutesConfig();
  };
  public rutesConfig() {
    this.APIroute.get("/", Segurity.verifyToken, PlayerController.consult)
    this.APIroute.post("/", PlayerController.create)
    this.APIroute.get("/filter", Segurity.verifyToken, PlayerController.filter)
    this.APIroute.delete("/:key", Segurity.verifyToken, PlayerController.delete)
    this.APIroute.put("/:key", Segurity.verifyToken, PlayerController.update)
    this.APIroute.get("/:key", Segurity.verifyToken, PlayerController.search)
  };
};

const playerRoute = new PlayerRoute();
export default playerRoute.APIroute;
