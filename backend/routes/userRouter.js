const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/usersController.js");

router.post("/users/signUp", usersController.signUp);
router.post("/users/signIn", usersController.signIn);

router.get(
  "/users/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/users/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),usersController.googleSignUp
);

module.exports = router;