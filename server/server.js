require('dotenv').config();
console.log(process.env); // remove this after you've confirmed it working

const express = require("express");

const app = express();

// sets port to value defined in .env file
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`server is up & listening on port ${port}`);
});
