const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const registration = require("./routes/registration");


const app = express();

app.set('port', 8081);

app.use(cors());
app.use(bodyParser());

console.log("in here");
app.use("/api/registration", registration);

app.get("/", (req, res) => {
  console.log("works");
  res.send("hello");
})



module.exports = app;
