const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "ChatApp",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Error occured while connecting to database", error.message);
    });
};

module.exports = dbConnection;
