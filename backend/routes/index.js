const express = require("express");
const router = express.Router();

router.use("/v1/users",require("./userRouter"));

module.exports = router;