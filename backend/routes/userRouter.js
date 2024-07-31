const express = require("express");
const router = express.Router();

const homeController = require("../controllers/HelloController.js");

router.get("/",homeController.Hello);

module.exports = router;