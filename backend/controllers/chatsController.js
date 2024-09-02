const profileImageSchema = require("../models/profileImageSchema");

module.exports.uploadImage = async (req, res) => {
 try {
   const userId = req.body.userId;
   const user = await profileImageSchema.findById(userId);

   if (!user) {
     return res.status(404).json({ message: "User not found" });
   }

   user.profileImage = `/uploads/${req.file.filename}`;
   await user.save();

   res.status(200).json({
     message: "Profile image uploaded successfully",
     profileImage: user.profileImage,
   });
 } catch (error) {
   res.status(500).json({
     message: "Error uploading profile image",
     error: error.message,
   });
 }
};
