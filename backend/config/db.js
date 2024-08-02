const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected to the database");
  } catch (err) {
    console.log("Error in connecting database", err);
  }
};

module.exports = dbConnection;
