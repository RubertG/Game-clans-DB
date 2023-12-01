import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConectionDB";
import PlayerRoutes from "../route/PlayerRoute";
import PlayerCategory from "../route/PlayerCategoryRoute";
import Clan from "../route/ClanRoute";
import ClanCategory from "../route/ClanCategoryRoute";
import Segurity from "../middleware/Segurity";

class Server {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: ".env" });
    ConexionDB();
    this.app = express();
    this.InitiateConfig();
    this.initiateRoutes();
  };

  public InitiateConfig() {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50MB" }));
    this.app.use(express.urlencoded({ extended: true }));

  };

  public initiateRoutes() {
    this.app.use("/player", Segurity.verifyToken, PlayerRoutes);
    this.app.use("/player-category", PlayerCategory);
    this.app.use("/clan", Clan);
    this.app.use("/clan-category", ClanCategory);
  };

  public initiateServer() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Backend ready on port:", this.app.get("PORT"));
    });
  }
};

export default Server;




