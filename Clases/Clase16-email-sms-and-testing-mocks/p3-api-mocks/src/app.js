import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
import userRoutes from "./routes/user.routes.js";

const PORT_APP = 5000;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongo-mocks-products";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:20 ~ CONNECTED TO MONGO, WELCOME!!!");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:22 ~ .then ~ ERROR CONNECTION!!!", err);
  });

app.use("/api/users", userRoutes);

app.listen(PORT_APP, () => {
  displayRoutes(app);
  console.log("🚀 ~ file: app.js:6 ~ app.listen ~ PORT_APP:", PORT_APP);
});