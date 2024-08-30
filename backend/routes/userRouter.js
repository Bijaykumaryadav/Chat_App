const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/usersController.js");

router.post("/signUp", usersController.signUp);
router.get("/verify-user/:token", usersController.verifyUser);
router.post("/signIn", usersController.signIn);

router.post("/forgotten-password", usersController.forgottenPassword);
router.post("/reset-password/:token", usersController.resetPassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  usersController.googleSignUp
);

module.exports = router;