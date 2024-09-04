const profileImageSchema = require("../models/profileImageSchema");
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");
require("dotenv").config();

module.exports.ontToOneChat = async function (req, res) {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId not sent with the request");
    return res.status(400).json({
      message: "Group Chat Id Sent!",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(200).json({
      message: "Group Chat Id Sent!",
    });
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $eleMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name profileImage email",
  });

  if (isChat.length > 0) {
    return res.status(200).json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return res.status(200).json(fullChat);
    } catch (error) {
      console.log(`Error in creating the chat ${error}`);
      return res.status(400).json("Not created the Chat");
    }
  }
};

module.exports.fetchChat = async function (req, res) {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .exec();

    const populatedResults = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.status(200).json(populatedResults);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching chats",
      error: error.message,
    });
  }
};

module.exports.createGroupChat = async function (req, res) {
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(201).json("Need more than 2 members to create group");
  }

  users.push(req.user);
  console.log("Group Chat");
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(`Error in creating group chat ${error}`);
    return res.status(500).json("Internal Server Error!");
  }
};

module.exports.renameChatGroup = async function (req, res) {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(400).json("Chat not Updated!");
    } else {
      return res.status(200).json(updatedChat);
    }
  } catch (err) {
    console.log("Error in updating the name of the group chat");
    return res.status(400).json("Internal Server Error!");
  }
};

module.exports.addUsers = async function (req, res) {
  try {
    const { chatId, userIds } = req.body;
    console.log(chatId, userIds);

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: { $each: userIds } } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      console.log("Error in adding the users in the chat");
      return res.status(400).json("Internal Server Error");
    } else {
      return res.status(200).json(updatedChat);
    }
  } catch (error) {
    console.log(`Error in adding the users ${error}`);
    return res.status(400).json("Internal Server Error!!");
  }
};

module.exports.removeUser = async function (req, res) {
  try {
    const { chatId, userId } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    if (!updatedChat) {
      console.log("Error in adding the users in the chat");
      return res.status(400).json("Internal Server Error");
    } else {
      return res.status(200).json(updatedChat);
    }
  } catch (error) {
    console.log(`Error in adding the users ${error}`);
    return res.status(400).json("Internal Server Error!!");
  }
};

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
