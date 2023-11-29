import { connect } from "mongoose";

const ConectionDB = () => {
  const URL = String(process.env.DB_MONGO);
  connect(URL)
    .then(() => {
      console.log("You are connected to the database.", process.env.DB_MONGO);
    })
    .catch((error) => {
      console.log("Not found MongoDB.", error);
    });
};

export default ConectionDB;
