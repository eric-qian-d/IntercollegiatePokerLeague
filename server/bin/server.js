var http = require("http");
var express = require("express");

const port = process.env.PORT || 8081;
module.exports = {
	start: (app) => {
    var server = http.createServer(app);
		console.log(socketIO);
    var io = socketIO(server);
		server.listen(port, () => {
			console.log('Express server listening on port ' + server.address().port);
		});
	},

}
