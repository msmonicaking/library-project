require("dotenv").config();

const { response } = require("express");

const express = require("express"); // middleware
const morgan = require("morgan"); // 3rd party middleware
const db = require("./db");
const cors = require("cors");

const app = express();

// middleware

app.use(morgan("dev"));
app.use(cors());

// takes info in from request and attaches it to body
app.use(express.json());

//--------------------------------------------------------------
// USER

// get all useraccounts
// done
app.get("/api/users/", async (req, res) => {
	try {
		const results = await db.query("SELECT * FROM useraccount");

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				user: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// POST create a useraccount
// done
app.post(
	"/api/users/",
	async (req, res) => {
		console.log(req.body); // req.body attached due to middleware

		// const{curId} = req.body.usertypeid;

		try {
			const results = await db.query(
				
				"INSERT INTO usertype (type) VALUES (user)",
				"INSERT INTO useraccount (firstname, lastname, username, usertypeid, email, phonenumber, isdeleted, pw) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
				[
					req.body.firstname,
					req.body.lastname,
					req.body.username,
					req.body.usertypeid,
					req.body.email,
					req.body.phonenumber,
					req.body.isdeleted,
					req.body.password,
				]
			);
			// console.log(results);
			res.status(201).json({
				status: "success",
				data: {
					user: results.rows[0],
				},
			});
		} catch (err) {
			console.log(err);
			res.status(201).json({
				status: "error",
				data: {
					error: err,
				},
			});
		}
	}
	// response.send("create a user");
);

app.get("/api/users/:email", async (req, res) => {
	try {
		const user = await db.query("SELECT * FROM useraccount WHERE email = $1;", [
			req.params.email,
		]);
		res.status(200).json({
			status: "success",
			data: {
				user: user.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// GET get USER with ID
// done
app.get("/api/users/:id", async (req, res) => {
	console.log(`${req.params.id}`);
	try {
		const results = await db.query("SELECT * FROM useraccount where id = $1;", [
			req.params.id,
		]);

		// console.log(results.rows[0]);

		res.status(200).json({
			status: "success",
			data: {
				user: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
	// console.log(req.params.id);
	// response.send("get a user");
});

// update a user
// PUT update USER
// done
app.put("/api/users/:id", async (req, res) => {
	try {
		const results = await db.query(
			"UPDATE useraccount SET firstname = $1, lastname = $2, email = $3, usertypeid = $4, phonenumber = $5, isdeleted = $6 where id = $7 returning *",
			[
				req.body.firstname,
				req.body.lastname,
				req.body.email,
				req.body.usertypeid,
				req.body.phonenumber,
				req.body.isdeleted,
				req.params.id,
			]
		);

		res.status(200).json({
			status: "success",
			data: {
				book: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
	console.log(req.params.id);
	console.log(req.body);
});

// mark a user as deleted
// I HAVE MODIFIED THE ROUTE
// done
app.put("/api/users/deleted/:id", async (req, res) => {
	try {
		const results = db.query(
			"UPDATE useraccount SET isdeleted = true WHERE id = $1 returning *",
			[req.params.id]
		);

		res.status(204).json({
			status: "success",
		});
		console.log("deleted");
	} catch (err) {
		console.log(err);
	}

	console.log(req.params.id);
});

//--------------------------------------------------------------
// AUTHOR

// add new author
// done
app.post("/api/author", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"INSERT INTO author (firstname, lastname) VALUES ($1, $2) returning *",
			[req.body.firstname, req.body.lastname]
		);
		console.log(results);
		res.status(201).json({
			status: "success",
			data: {
				author: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
	// response.send("add new author");
});

//--------------------------------------------------------------
// CATEGORY

// add new category
//done
app.post("/api/category", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"INSERT INTO category (name) VALUES ($1) returning *",
			[req.body.name]
		);
		console.log(results);
		res.status(201).json({
			status: "success",
			data: {
				category: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
	// response.send("add new category");
});

// add new usertype
//
app.post("/api/usertype", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"INSERT INTO usertype (type) VALUES ($1) returning *",
			[req.body.type]
		);
		console.log(results);
		res.status(201).json({
			status: "success",
			data: {
				author: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

//--------------------------------------------------------------
// BOOK

// get all books
// NOT FINISH
app.get("/api/books/", async (req, res) => {
	try {
		const results = await db.query("SELECT * FROM book");

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
	response.send("get all books");
});

// get a book
// NOT TESTED
app.get("/api/books/:id", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query("SELECT * FROM book WHERE id = book.id");

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
	response.send("get a book");
});

// add new book
//
app.post("/api/books", async (req, res) => {
	console.log(req.body);
	try {
		const results = await db.query(
			"INSERT INTO book (catalogid, isdeleted, isavailable) VALUES ($1, false, true) RETURN *;"[
				req.body.catalogid
			]
		);

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
	response.send("add new book");
});

// mark a book as deleted
app.put("/api/books/deleted/:id", async (req, res) => {
	try {
		const results = await db.query(
			"UPDATE book SET isdeleted = true WHERE id = id "
		);

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}

	response.send("delete a book");
});

//--------------------------------------------------------------
// CHECKOUT

// create a checkout
// check book out case
app.post("/api/checkout/", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"INSERT INTO checkout (userid, bookid, dateout, returnby, isreturned) VALUES ($1, $2, $3, $4, false)",
			[req.body.userid, req.body.bookid, req.body.dateout, req.body.returnby]
		);

		console.log(results);

		res.status(201).json({
			status: "success",
			data: {
				data: {
					books: results.rows[0],
				},
			},
		});
	} catch (err) {
		console.log(err);
	}

	response.send("create a checkout");
});

// update a checkout
// return book case
app.put("/api/checkout/", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"UPDATE checkout SET isreturned = true, returndate = $2 WHERE bookid = $1",
			[req.body.bookid, req.body.returndate]
		);

		console.log(results);

		res.status(201).json({
			status: "success",
			data: {
				data: {
					books: results.rows[0],
				},
			},
		});
	} catch (err) {
		console.log(err);
	}

	response.send("update a checkout");
});

//--------------------------------------------------------------
// CATALOGCARDS

// retrieve all catalogcards
app.get("/api/catalogcard/", async (req, res) => {
	try {
		const allcards = await db.query("SELECT * FROM catalogcard");

		res.status(200).json({
			status: "success",
			results: allcards.rows.length,
			data: {
				catalogcard: allcards.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}

	response.send("get all catalogcards");
});

// get the available stock for a catalogCard
app.get("/api/catalogcard/stock/:id", (req, res) => {
	db.query(
		"SELECT COUNT(*) as stock FROM Book WHERE catalogid = $1 AND isavaiable = true",
		[req.params.id]
	)
		.then((bookStock) => {
			console.log(bookStock);
			res.status(200).json({
				status: "success",
				stock: bookStock.rows[0],
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(200).json({
				status: "error",
				data: err,
			});
		});
});

// create a catalogcard
app.post("/api/catalogcard/", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"INSERT INTO catalogcard (title, authorid, categoryid, isbn) values ($1, $2, $3, $4) returning *",
			[req.body.title, req.body.authorid, req.body.categoryid, req.body.isbn]
		);

		console.log(results);

		res.status(201).json({
			status: "succes",
			data: {
				catalog: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}

	response.send("get all catalogcards");
});

//--------------------------------------------------------------
// END OF FILE BUSINESS

// sets port to value defined in .env file
const port = process.env.PORT || 3003;
app.listen(port, () => {
	console.log(`server is up & listening on port ${port}`);
});
