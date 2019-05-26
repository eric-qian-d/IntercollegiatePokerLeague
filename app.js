var express = require("express");
// var db = require("./routes/db");
var game = require("./routes/game");



var app = express();

app.use('/static', express.static('public'));

app.get("/game", function(request, response) {
	response.sendFile('game.html', {root:'src/pages'});
});


module.exports = app
