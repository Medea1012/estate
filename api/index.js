import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect to MongooseDB!");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server running on Port 3000");
});
