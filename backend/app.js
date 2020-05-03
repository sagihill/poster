const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

const dbConnection =
  "mongodb+srv://sagihillel:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0-cibez.mongodb.net/node-angular?retryWrites=true&w=majority";
mongoose
  .connect(dbConnection)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error.errmsg, " - This is a connection error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("", (req, res, next) => {
  res.status(200).json({
    message: "Server loaded successfully",
  });
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
