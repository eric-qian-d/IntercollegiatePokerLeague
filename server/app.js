var express = require("express");
var cors = require("cors");
// var db = require("./routes/db");
var game = require("./routes/game");
// var socket = require("./")



var app = express();

app.use(cors);
// app.use("/game", game);
// app.use('/static', express.static('public'));

// app.get("/game", function(request, response) {
// 	response.sendFile('game.html', {root:'src/pages'});
// });


module.exports = app
