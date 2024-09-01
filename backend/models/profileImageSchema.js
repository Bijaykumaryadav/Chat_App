const mongoose = require("mongoose");

// User schema and model
const profileImageSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId, // Corrected this line
    ref: "User",
    required: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const Pimage = mongoose.model("Pimage", profileImageSchema);

module.exports = Pimage;
