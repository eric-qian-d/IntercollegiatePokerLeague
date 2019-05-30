var express = require("express");
var cors = require("cors");
var registration = require("./routes/registration");


const app = express();

app.set('port', 8081);

app.use(cors());
console.log("in here");
app.use("/api/registration", registration);

app.get("/", (req, res) => {
  console.log("works");
  res.send("hello");
})



module.exports = app;
