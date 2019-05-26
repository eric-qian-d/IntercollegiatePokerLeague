var http = require("http");

module.exports = {
	start: app => {
		port = process.env.PORT || 8081;
		var server = http.createServer(app);
		server.listen(port, () => {
			console.log('Express server listening on port ' + server.address().port);
		});
	}
}


// const db = require('../routes/db.js');
//
// // console.log(db);
// var test = async () => {
// 	const res = await db.query('SELECT * FROM users');
// 	for(var i = 0; i < res.rows.length; i++) {
// 		console.log(res.rows[i]);
// 	}
// }
//
// test();
