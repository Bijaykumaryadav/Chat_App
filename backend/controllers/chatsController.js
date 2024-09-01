const profileImageSchema = require("../models/profileImageSchema");

module.exports.uploadImage = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await profileImageSchema.findOne(_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.profileImage = req.file.path;
    await user.save();
    res.status(200).json({ message: 'Profile image uploaded successfully', path: req.file.path });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
