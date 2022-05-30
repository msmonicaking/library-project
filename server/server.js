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

// create a user
app.post("/api/users/", async(req, res) => {
    response.send("create a user");
});

// get a user
app.get("/api/users/:id", async(req, res) => {
    console.log(req.params.id);
    response.send("get a user");
});

// update a user
app.put("/api/users/:id", async(req, res) => {
    console.log(req.params.id);
});

// mark a user as deleted
app.put("/api/users/:id", async(req, res) => {
    console.log(req.params.id);
});

//--------------------------------------------------------------

// get all books
app.get("/api/books/", async(req, res) => {
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
