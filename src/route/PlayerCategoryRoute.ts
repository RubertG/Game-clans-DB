import { Router } from "express";
import PlayerCategoryController from "../controller/PlayerCategoryController";

class PlayerCategoryRuta {
  public APIroute: Router;
  constructor() {
    this.APIroute = Router();
    this.rutesConfig();
  };
  public rutesConfig() {
    this.APIroute.get("/", PlayerCategoryController.consult);
    this.APIroute.post("/", PlayerCategoryController.create);
    this.APIroute.delete("/:key", PlayerCategoryController.delete);
    this.APIroute.put("/:key", PlayerCategoryController.update);
    this.APIroute.get("/:key", PlayerCategoryController.search);
  };
};

const playerCategoryRuta = new PlayerCategoryRuta();
export default playerCategoryRuta.APIroute;
