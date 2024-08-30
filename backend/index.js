const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const passport = require("passport");
const passportGoogle = require("./config/passport-google-strategy");

dotenv.config();

const app = express();

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbConnection();

app.use("/api", require("./routes"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
