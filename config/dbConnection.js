import Config from ".";
import mongoose from "mongoose";
const fs = require("fs");

export default class DBConnection {
  static connect() {
    console.log(
      "DB trying to connect on " + new Date() + " to url" + Config.DB
    );
    const caContent = [
      fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem"),
    ];
    const options = {
            keepAlive: 1,
            poolSize: 10,
            ssl: true,
            sslValidate: false,
            sslCA: caContent,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
    };
    return mongoose.connect(Config.DB, options);
  }
}
