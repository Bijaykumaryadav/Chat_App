const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const chatsController = require("../controllers/chatsController");

router.post(
  "/upload-profile-image",
  upload.single("profileImage"),
  chatsController.uploadImage
);

module.exports = router;
