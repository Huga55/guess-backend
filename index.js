const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//cors
app.use(cors());
app.options("*", cors());

//for post queries
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//404
app.use(function(req, res) {
    return res.status(404).send({success: false, error: "Данной страницы не существует"});
});

//server and mongodb
const PORT = config.get("PORT") || 5000;
mongoose.connect("mongodb://localhost:27017/guess", {useUnifiedTopology: true, useNewUrlParser: true}, function(err) {
    if(err) throw err;
    app.listen(PORT)
})