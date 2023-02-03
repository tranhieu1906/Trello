import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
const DB_URL = `mongodb://127.0.0.1:27017/Trello`;
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB connection error:", error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});
