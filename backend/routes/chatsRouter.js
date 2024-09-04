const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const chatsController = require("../controllers/chatsController");
const messageController = require("../controllers/messageController");
const passport = require("passport");

router.post(
  "/upload-profile-image",
  upload.single("profileImage"),
  chatsController.uploadImage
);

router.post(
  "/chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  chatsController.oneToOneChat
);

router.get(
  "/chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  chatsController.fetchChat
);

router.post(
  "/create-group-chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  chatsController.createGroupChat
);

router.post(
  "/rename-group-chat",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  chatsController.renameChatGroup
);

router.post(
  "/add-user-group-chat",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  chatsController.addUsers
);

router.post(
  "/remove-user-group-chat",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  chatsController.removeUser
);

router.post(
  "/chat/message",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  messageController.sendMessage
);

router.get(
  "/chat/message/:chatId",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  messageController.fetchAllMessages
);
module.exports = router;
