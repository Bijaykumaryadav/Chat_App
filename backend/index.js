const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const cors = require("cors");

dotenv.config(); // Load environment variables first

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Use the environment variable after it's loaded
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

dbConnection();

app.use("/", require("./routes/userRouter"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
