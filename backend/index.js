const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./config/db");

dotenv.config();

dbConnection();

app.use("/", require("./routes/userRouter"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
