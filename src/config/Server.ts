import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConectionDB";
import apiPerfilRuta from "../rute/PerfilRuta";
import apiVehiculoRuta from "../rute/VehiculoRutas";

class Server {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: ".env" });
    ConexionDB();
    this.app = express();
    this.iniciarconfig();
    this.iniciarRutas();
  };

  public iniciarconfig() {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50MB" }));
    this.app.use(express.urlencoded({ extended: true }));

  };
  public iniciarRutas() {
    this.app.use("/perfil", apiPerfilRuta);
    this.app.use("/carro", apiVehiculoRuta);

  };
  public iniciarServidor() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Backend listo en el puerto:", this.app.get("PORT"));
    });
  }
};

export default Server;




