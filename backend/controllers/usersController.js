const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Fill the form" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    await userSchema.create({ name, email, password });
    return res
      .status(200)
      .json({ success: true, message: "User created Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Logged In Successful", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in log in", error });
  }
};

module.exports.googleSignUp = function (req, res) {
  const { _id, name, email } = req.user;
  const userData = {
    id: _id,
    name,
    email,
  };
  const queryParams = new URLSearchParams(userData).toString();

  res.redirect(
    `http://localhost:8000/users/auth/googleCallback?${queryParams}`
  );
};
