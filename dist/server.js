"use strict";

var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json()); // Support base64 images

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.error("MongoDB connection error:", err);
});

// Routes 
var formRoute = require("./src/routes/formRoute");
var authRoute = require("./src/routes/authRoute");
var expansiveRoute = require("./src/routes/expansiveRoute");

// const billRoute = require("./src/controllers/billCountroller");

app.use("/api/form", formRoute);
// app.use("/api/form", billRoute);

app.use("/api/form", authRoute);
app.use("/api/form", expansiveRoute);

// Server
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});