"use strict";
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var mongoose = require("mongoose");
var config = require("config");
//cors
app.use(cors());
app.options("*", cors());
//for post queries
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// //404
// app.use(function(req, res) {
//     return res.status(404).send({success: false, error: "Данной страницы не существует"});
// });
//server and mongodb
var PORT = config.get("PORT") || 5000;
mongoose.connect("mongodb://localhost:27017/guess", { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
    if (err)
        throw err;
    app.listen(PORT);
});
