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
		const results = await db.query(
			"SELECT * FROM useraccount WHERE isdeleted = false;"
		);

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				user: results.rows,
			},
		});
	} catch (err) {
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
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
		const user = await db.query(
			"SELECT * FROM useraccount WHERE email = $1 AND isdeleted = false",
			[req.params.email]
		);
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
app.get("/api/users/id/:id", async (req, res) => {
	console.log(req.params.id);
	try {
		const results = await db.query(
			"SELECT * FROM useraccount where id = $1 AND isdeleted = false;",
			[req.params.id]
		);

		console.log(results.rows);

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
			"UPDATE useraccount SET firstname = $1, lastname = $2, email = $3, phonenumber = $4 where id = $5 returning *",
			[
				req.body.firstname,
				req.body.lastname,
				req.body.email,
				req.body.phonenumber,
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

// Check number of books a user have read
app.get("/api/users/read/:id", async (req, res) => {
	try {
		const results = await db.query(
			" select count(*) as bookCount from checkout where useraccountid = $1;",
			[req.params.id]
		);
		console.log(results);
		res.status(200).json({
			status: "success",
			data: {
				bookcount: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			status: "error",
			error: err,
		});
	}
});

//--------------------------------------------------------------
// AUTHOR

// get author by name
app.get("/api/author/:firstname/:lastname", async (req, res) => {
	try {
		const results = await db.query(
			"SELECT * FROM Author WHERE firstname = $1 AND lastname = $2",
			[req.params.firstname, req.params.lastname]
		);
		console.log(results);
		res.status(200).json({
			status: "success",
			data: {
				author: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			status: "error",
			error: err,
		});
	}
});
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
		res.status(201).json({
			status: "error",
			error: err,
		});
	}
	// response.send("add new author");
});

//--------------------------------------------------------------
// CATEGORY

// get all categories
app.get("/api/category", async (req, res) => {
	try {
		const category = await db.query("SELECT * FROM Category;");
		res.status(200).json({
			status: "success",
			results: category.rows.length,
			categories: category.rows,
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});

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
		res.status(201).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
	// response.send("add new category");
});

// delete a category
app.delete("/api/category/:id", async (req, res) => {
	try {
		const results = await db.query("DELETE FROM Category WHERE id = $1", [
			req.params.id,
		]);
		console.log(results);
		res.status(201).json({
			status: "success",
			data: results,
		});
	} catch (err) {
		console.log(err);
		res.status(201).json({
			status: "error",
			data: err,
		});
	}
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
			"INSERT INTO book (catalogid, isdeleted, isavaiable) VALUES ($1, false, true) RETURNING *;",
			[req.body.catalogid]
		);

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows[0],
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
			"UPDATE book SET isdeleted = true, isavaiable = false WHERE id = $1",
			[req.params.id]
		);

		console.log(results);

		res.status(201).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows,
			},
		});
	} catch (err) {
		res.status(201).json({
			status: "error",
			results: results.rows.length,

			data: {
				error: err,
			},
		});
	}
});

//--------------------------------------------------------------
// CHECKOUT
// get an available book
app.get("/api/book/get/:catid", async (req, res) => {
	try {
		const results = await db.query(
			"SELECT * FROM Book WHERE catalogid = $1 AND isavaiable = true AND isdeleted = false order by id LIMIT 1;",
			[req.params.catid]
		);

		console.log(results);

		res.status(200).json({
			status: "success",
			data: {
				book: results.rows[0],
			},
		});
	} catch (err) {
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});

// mark a book as on loan
app.put("/api/book/:id", async (req, res) => {
	try {
		const results = await db.query(
			"UPDATE book SET isavaiable = false WHERE id = $1;",
			[req.params.id]
		);

		console.log(results);

		res.status(200).json({
			status: "success",
			results: results.rows.length,

			data: {
				books: results.rows[0],
			},
		});
	} catch (err) {
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});

// get all orders for a user
app.get("/api/orders/:id", async (req, res) => {
	try {
		const results = await db.query(
			"select c.*, u.username, u.firstname, u.lastname, cat.title, a.firstname as authorfn, a.lastname as authorln FROM Checkout c JOIN Useraccount u ON c.useraccountid = u.id JOIN Book on Book.id = c.bookid JOIN Catalogcard cat ON cat.id = Book.catalogid JOIN Author a ON a.id = cat.authorid WHERE c.useraccountid = $1 ORDER BY c.isreturned;",
			[req.params.id]
		);

		res.status(200).json({
			status: "success",
			data: {
				orders: results.rows,
			},
		});
	} catch (err) {
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});

// get all orders for admin
app.get("/api/allorders", async (req, res) => {
	try {
		const results = await db.query(
			"select c.*, u.username, u.firstname, u.lastname, cat.title, a.firstname as authorfn, a.lastname as authorln FROM Checkout c JOIN Useraccount u ON c.useraccountid = u.id JOIN Book on Book.id = c.bookid JOIN Catalogcard cat ON cat.id = Book.catalogid JOIN Author a ON a.id = cat.authorid ORDER BY c.isreturned;"
		);

		res.status(200).json({
			status: "success",
			data: {
				orders: results.rows,
			},
		});
	} catch (err) {
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});
// get all unreturned books
app.get("/api/orders", async (req, res) => {
	try {
		const results = await db.query(
			"select c.*, u.username, u.firstname, u.lastname, cat.title, a.firstname as authorfn, a.lastname as authorln FROM Checkout c JOIN Useraccount u ON c.useraccountid = u.id JOIN Book on Book.id = c.bookid JOIN Catalogcard cat ON cat.id = Book.catalogid JOIN Author a ON a.id = cat.authorid WHERE isreturned = false;"
		);

		res.status(200).json({
			status: "success",
			data: {
				orders: results.rows,
			},
		});
	} catch (err) {
		res.status(200).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});

// create a checkout
// check book out case
app.post("/api/checkout", async (req, res) => {
	console.log(req.body);
	const dateout = new Date(Date.now());
	let returnby = new Date(Date.now());
	returnby.setMonth(returnby.getMonth() + 1);
	try {
		const results = await db.query(
			"INSERT INTO checkout (useraccountid, bookid, dateout, returnby, isreturned) VALUES ($1, $2, $3, $4, false)",
			[req.body.userid, req.body.bookid, dateout, returnby]
		);

		console.log(results);

		res.status(201).json({
			status: "success",
			data: {
				books: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// update the availability of a book
app.put("/api/return", async (req, res) => {
	try {
		const results = await db.query(
			"UPDATE book SET isavaiable = true WHERE id = $1",
			[req.body.bookid]
		);

		console.log(results);

		res.status(201).json({
			status: "success",
			data: {
				book: results.rows[0],
			},
		});
	} catch (err) {
		res.status(201).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});
// update a checkout
// return book case
app.put("/api/checkout", async (req, res) => {
	console.log(req.body);
	const returndate = new Date(Date.now());
	try {
		const results = await db.query(
			"UPDATE checkout SET isreturned = true, returndate = $1 WHERE bookid = $2",
			[returndate, req.body.bookid]
		);

		console.log(results);

		res.status(201).json({
			status: "success",
			data: {
				book: results.rows[0],
			},
		});
	} catch (err) {
		res.status(201).json({
			status: "error",
			data: {
				error: err,
			},
		});
	}
});

//--------------------------------------------------------------
// CATALOGCARDS

// retrieve all catalogcards
app.get("/api/catalogcard/", async (req, res) => {
	const query =
		"select cata.id, title, authorid, categoryid, description, isbn, author.firstname, author.lastname, category.name as category from catalogcard cata join category on category.id = cata.categoryid join author on author.id = authorid ORDER BY cata.id;";
	try {
		const allcards = await db.query(query);

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
});

// get all fictions
app.get("/api/catalogcard/fiction", async (req, res) => {
	const query =
		"select cata.id, title, authorid, categoryid, description, isbn, author.firstname, author.lastname, category.name as category from catalogcard cata join category on category.id = cata.categoryid join author on author.id = authorid WHERE category.name = 'Fiction' ORDER BY cata.id;";
	try {
		const allcards = await db.query(query);

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
});

// get all non-fictions
app.get("/api/catalogcard/nonfiction", async (req, res) => {
	const query =
		"select cata.id, title, authorid, categoryid, description, isbn, author.firstname, author.lastname, category.name as category from catalogcard cata join category on category.id = cata.categoryid join author on author.id = authorid WHERE category.name = 'Non Fiction' ORDER BY cata.id;";
	try {
		const allcards = await db.query(query);

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
});
// get a catalog by id
app.get("/api/catalogcard/:id", (req, res) => {
	db.query(
		"select cata.id, title, authorid, categoryid, description, isbn, author.firstname, author.lastname, category.name as category from catalogcard cata join category on category.id = cata.categoryid join author on author.id = authorid WHERE cata.id = $1;",
		[req.params.id]
	)
		.then((book) => {
			res.status(200).json({
				status: "success",
				book: book.rows[0],
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

// get the available stock for a catalogCard
app.get("/api/catalogcard/stock/:id", (req, res) => {
	db.query(
		"SELECT COUNT(*) as stock FROM Book WHERE catalogid = $1 AND isavaiable = true AND isdeleted = false;",
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
			"INSERT INTO catalogcard (title, authorid, categoryid, isbn, description) values ($1, $2, $3, $4, $5) returning *",
			[
				req.body.title,
				req.body.authorid,
				req.body.categoryid,
				req.body.isbn,
				req.body.description,
			]
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

// update a catalog
app.put("/api/catalog/:id", async (req, res) => {
	// title, authorid, categoryid, isbn, description
	try {
		const result = await db.query(
			"UPDATE Catalogcard SET title = $1, authorid = $2, categoryid = $3, isbn = $4, description = $5 WHERE id = $6",
			[
				req.body.title,
				req.body.authorid,
				req.body.categoryid,
				req.body.isbn,
				req.body.description,
				req.params.id,
			]
		);
		res.status(201).json({
			status: "success",
			data: {
				catalog: result.rows,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(201).json({
			status: "error",
			data: err,
		});
	}
});

// delete a catalog
app.delete("/api/catalogcard/:id", async (req, res) => {
	try {
		const results = await db.query("DELETE FROM Catalog WHERE id = $1", [
			req.params.id,
		]);
		console.log(results);
		res.status(201).json({
			status: "success",
			data: results,
		});
	} catch (err) {
		console.log(err);
		res.status(201).json({
			status: "error",
			data: err,
		});
	}
});

//--------------------------------------------------------------
// END OF FILE BUSINESS

// sets port to value defined in .env file
const port = process.env.PORT || 3003;
app.listen(port, () => {
	console.log(`server is up & listening on port ${port}`);
});
