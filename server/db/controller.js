const db = require("./db");

module.exports = {
	findOneAuthorByName: (req, res) => {
		db.query("SELECT * FROM Author WHERE firstname = $1 AND lastname = $2", [
			req.body.firstname,
			req.body.lastname,
		])
			.then((author) => {
				console.log(author);
				res.status(200).json({
					status: "success",
					data: {
						author: author.rows[0],
					},
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(200).json({
					status: "error",
					data: {
						error: err,
					},
				});
			});
	},
};
