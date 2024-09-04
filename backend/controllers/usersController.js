const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const {
  forgottenPasswordEmail,
} = require("../mailers/forgottenPasswordMailer");
const { verifyUserEmail } = require("../mailers/verifyUserEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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
    const User = await userSchema.create({
      name,
      email,
      password,
      token: crypto.randomBytes(16).toString("hex"),
    });
    verifyUserEmail(User);
    return res.status(200).json({
      success: true,
      message: "User created Successfully",
      User,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await userSchema.findOne({ token });
    if (!user) {
      return res.status(401).json({
        message: "Token not valid",
        success: false,
      });
    }
    user.isApproved = true;
    user.token = crypto.randomBytes(16).toString("hex");
    await user.save();
    console.log(user);

    return res.status(200).json({
      success: true,
      message: "Verified Successfully",
    });
  } catch (error) {
    console.log(`Error in verifying the user ${error}`);
    return res.status(500).json({
      message: "Internal Server Error !",
    });
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

    if (!user.isApproved) {
      return res.status(401).json({
        success: false,
        message: "Please Verify Your Email",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    const jwtToken = await jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Logged In Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        jwtToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in log in", error });
  }
};

// /user/search-user/?search?=name
module.exports.searchUser = async function (req, res) {
  console.log(req.user);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await userSchema.find(keyword).select("-password");
  res.send(users);
};

module.exports.googleSignUp = function (req, res) {
  const { _id, name, email } = req.user;
  const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  const userData = {
    id: _id,
    name,
    email,
    token,
  };
  const queryParams = new URLSearchParams(userData).toString();

  res.redirect(
    `${process.env.FRONTEND_URL}/users/auth/googleCallback?${queryParams}`
  );
};

//To sending mail to the user when forgots password
module.exports.forgottenPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      forgottenPasswordEmail(user);
      return res.status(200).json({
        success: true,
        message: "Password reset link has been sent to your email",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Email not Registered",
      });
    }
  } catch (error) {
    console.log(`Error in sending Forgotten Password Email ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.params.token;
    const user = await userSchema.findOne({ token });
    if (!user) {
      return res.status(201).json({
        message: "Token not Valid",
      });
    } else {
      if (user.email === email) {
        user.password = password;
        await user.save();
        return res.status(200).json({
          message: "Password Updated Successfully",
        });
      } else {
        return res.status(202).json({
          message: "Email Not registered",
        });
      }
    }
  } catch (error) {
    console.log(`Error in reseting password ${error}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
