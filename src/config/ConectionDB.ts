import { connect } from "mongoose";

const ConectionDB = () => {
  const URL = String(process.env.DB_MONGO);
  connect(URL)
    .then(() => {
      console.log("Estas conectado a mondoDB", process.env.DB_MONGO);
    })
    .catch((miError) => {
      console.log("NO encuentro a mongo", miError);
    });
};

export default ConectionDB;
