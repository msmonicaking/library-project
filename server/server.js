require("dotenv").config();

const { response } = require('express');

const express = require("express"); // middleware
const morgan = require("morgan"); // 3rd party middleware
const db = require("./db");

const app = express();

// middleware
app.use(express.json());

//--------------------------------------------------------------

// get all users
// done
app.get("/api/users/", async(req, res) => {
    try {
        const results = await db.query("SELECT * FROM useraccount");

        console.log(results);

        res.status(200).json({
            status: "success",
            results: results.rows.length,

            data:{
                user: results.rows
            },
        });

    } catch(err) {
        console.log(err);
    }
});

// POST create users
// done
app.post("/api/users/", async(req, res) => {
    console.log(req.body); // req.body attached due to middleware

    try{
        const results = await db.query(
            "INSERT INTO useraccount (firstname, lastname, username, usertypeid, email, phonenumber, isdeleted) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *",
            [req.body.firstname, req.body.lastname, req.body.username, req.body.usertypeid, req.body.email, req.body.phonenumber, req.body.isdeleted]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                book: results.rows[0],
            },
        });
    }catch(err) {
        console.log(err);
    }
    response.send("create a user");
});

// GET get USER with ID
// done
app.get("/api/users/:id", async(req, res) => {
    console.log(`${req.params.id}`);
    try{
        const results = await db.query(
            "SELECT * FROM useraccount where id = $1;",
            [req.params.id]
        );

        // console.log(results.rows[0]);

        res.status(200).json({
            status: "success",
            data:{
                user: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
    // console.log(req.params.id);
    // response.send("get a user");
});

// update a user
// PUT update USER
// done
app.put("/api/users/:id", async(req, res) => {
    try{
        const results = await db.query(
            "UPDATE useraccount SET firstname = $1, lastname = $2, email = $3, usertypeid = $4, phonenumber = $5, isdeleted = $6 where id = $7 returning *",
            [req.body.firstname, req.body.lastname, req.body.email, req.body.usertypeid, req.body.phonenumber, req.body.isdeleted, req.params.id]
        );

        res.status(200).json({
            status: "success",
            data:{
                book: results.rows[0],
            },
        });
    }catch(err) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
});

// mark a user as deleted
// I HAVE MODIFIED THE ROUTE
// done
app.put("/api/users/deleted/:id", async(req, res) => {
    try{
        const results = db.query("UPDATE useraccount SET isdeleted = true WHERE id = $1 returning *",
            [req.params.id]);

        res.status(204).json({
            status: "success",
        });
        console.log("deleted");
    }catch(err) {
        console.log(err);
    }

    console.log(req.params.id);
});

//--------------------------------------------------------------

// add new author
// done
app.post("/api/author", async(req, res) => {
    console.log(req.body);

    try{
        const results = await db.query(
            "INSERT INTO author (firstname, lastname) VALUES ($1, $2) returning *",
            [req.body.firstname, req.body.lastname]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                author: results.rows[0],
            },
        });
    }catch(err) {
        console.log(err);
    }
    // response.send("add new author");
});

// add new category
//done
app.post("/api/category", async(req, res) => {
    console.log(req.body);

    try{
        const results = await db.query(
            "INSERT INTO category (name) VALUES ($1) returning *",
            [req.body.name]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                category: results.rows[0],
            },
        });
    }catch(err) {
        console.log(err);
    }
    // response.send("add new category");
});

//--------------------------------------------------------------

// get all books
// NOT FINISH
app.get("/api/books/", async(req, res) => {
    try {
        const results = await db.query("SELECT * FROM book");

        console.log(results);

        res.status(200).json({
            status: "success",
            results: results.rows.length,

            data:{
                books: results.rows
            },
        });

    } catch(err) {
        console.log(err);
    }
    response.send("get all books");
});

// get a book
app.get("/api/books/:id", async(req, res) => {
    response.send("get a books");
});

// add new book
app.post("/api/books/:id", async(req, res) => {
    response.send("add new book");
});

// update a books info
app.put("/api/books/:id", async(req, res) => {
    response.send("update a book");
});

// mark a book as deleted
app.get("/api/books/:id", async(req, res) => {
    response.send("delete a book");
});


//--------------------------------------------------------------

// return all checkouts
app.get("/api/orders/", async(req, res) => {
    response.send("get all checkouts");
});

// update a checkout
app.get("/api/orders/:id", async(req, res) => {
    response.send("update a checkout");
});

//--------------------------------------------------------------


// sets port to value defined in .env file
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`server is up & listening on port ${port}`);
});
