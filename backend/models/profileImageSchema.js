const mongoose = require("mongoose");

// User schema and model
const profileImageSchema = new mongoose.Schema({
  profileImage: String,
  _id: { type: mongoose.Schema.types.ObjectId, ref: "User" },
});

const Pimage = mongoose.model("Pimage", profileImageSchema);

module.exports = Pimage;