var express = require("express");
var cors = require("cors");
var registration = require("./routes/registration");


var app = express();

app.use(cors);
app.use("/api/registration", registration);


module.exports = app;
