const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js");

router.post("/users/signUp", usersController.signUp);

module.exports = router;
