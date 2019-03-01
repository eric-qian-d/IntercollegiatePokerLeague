const db = require('../routes/db.js');

// console.log(db);
var test = async () => {
	const res = await db.query('SELECT * FROM users');
	for(var i = 0; i < res.rows.length; i++) {
		console.log(res.rows[i]);
	}
}

test();