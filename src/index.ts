import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import config from "config";

const app = express();
//cors
app.use(cors());
//app.options("*", cors());

//for post queries
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {

})
// //404
// app.use(function(req, res) {
//     return res.status(404).send({success: false, error: "Данной страницы не существует"});
// });

//server and mongodb
const PORT = config.get("PORT") || 5000;
mongoose.connect("mongodb://localhost:27017/guess", {useUnifiedTopology: true, useNewUrlParser: true}, function(err: any) {
    if(err) throw err;
    app.listen(PORT)
})