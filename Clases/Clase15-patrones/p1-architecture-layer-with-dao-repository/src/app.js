import express from "express";
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
// import mongoose from "mongoose";

import productsRoutes from "./routes/product.routes.js";
import { PORT, PERSISTENCE } from "./config/config.js";

const app = express();

const PORT_APP = PORT | 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongoose
//   .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
//   .then((conn) => {
//     console.log("🚀 ~ file: app.js:20 ~ CONNECTED TO MONGO, WELCOME!!!");
//   })
//   .catch((err) => {
//     console.log("🚀 ~ file: app.js:22 ~ .then ~ ERROR CONNECTION!!!", err);
//   });

app.use("/api/products/", productsRoutes);

app.listen(PORT_APP, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT_APP}, PERSISTENCE: ${PERSISTENCE}`);
});