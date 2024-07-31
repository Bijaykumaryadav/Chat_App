const express = require("express");
const app = express();
const port = 8000;

app.use("/", require("./routes/userRouter"));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
