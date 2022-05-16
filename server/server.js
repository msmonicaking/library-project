require('dotenv').config();
const { response } = require('express');
const express = require("express");
const app = express();



// get all users
app.get("/api/users", async(req, res) => {
    response.send("get users");
});

// create a user
app.post("/api/users", async(req, res) => {
    response.send("create a user");
});

// get a user
app.get("/api/users/:id", async(req, res) => {
    console.log(req);
    response.send("get a user");
});




// sets port to value defined in .env file
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`server is up & listening on port ${port}`);
});
