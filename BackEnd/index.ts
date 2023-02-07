import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
var bodyParser = require("body-parser");
import { ConnectDatabase } from "./src/configs/connectDatabase";
import route from "./src/routers/index.router";
dotenv.config();
ConnectDatabase.connect();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

route(app);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});
