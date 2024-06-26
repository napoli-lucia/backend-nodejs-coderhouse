const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const viewsRoutes = require("./routes/views.routes");
const sessionRoutes = require("./routes/session.routes");
const mongoStore = require("connect-mongo");

const app = express();

const PORT = 5000;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoLoginDB";

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const SECRET_SESSION = "secretSession";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 3600, //sesion dura 1 hora
    }),
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:45 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:48 ~ err:", err);
  });

app.use("/", viewsRoutes);
app.use("/api/session/", sessionRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});