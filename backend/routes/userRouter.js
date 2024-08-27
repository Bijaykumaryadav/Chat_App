const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js");

router.post("/users/signUp", usersController.signUp);
router.post("/users/signIn", usersController.signIn);

module.exports = router;