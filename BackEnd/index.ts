import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { ConnectDatabase } from "./src/configs/connectDatabase";
import route from "./src/routers/index.router"

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

ConnectDatabase.connect();
route(app);

app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});
