const express = require("express");
const router = express.Router();

router.use("/v1/users",require("./userRouter"));
router.use("/v1/chats",require("./chatsRouter"));

module.exports = router;