import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
var bodyParser = require("body-parser");
import { ConnectDatabase } from "./src/configs/connectDatabase";
import route from "./src/routers/index.router";
import { Server } from "socket.io";
const setupSocket = require("./src/realTimeHandle/operatingStatus.realTime");
const NotificationRealTime = require("./src/realTimeHandle/notification.realTime");
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

const server = app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const onConnection = (socket) => {
  setupSocket(io, socket);
  NotificationRealTime(io, socket);
};
io.on("connection", onConnection);
