require('dotenv').config();
console.log(process.env); // remove this after you've confirmed it working

const express = require("express");

const app = express();

// anytime we get a get method toward the passed URL, it will run this route
app.get("/getbooks", async(request, response) => {
    response.send("books!");

});

// sets port to value defined in .env file
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`server is up & listening on port ${port}`);
});
