const Message = require("../models/messageSchema");
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

module.exports.sendMessage = async function (req, res) {
  const { chatId, content } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into the request");
    return res.status(400).json("Internal server error");
  }
  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name profileImage");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email profileImage",
    });

    await Chat.findOneAndUpdate({ _id: chatId }, { latestMessage: message });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in sending message", error);
    res.status(400).json("Internal Server Error");
  }
};

module.exports.fetchAllMessages = async function (req, res) {
  try {
  } catch (error) {
    console.log(`Error in fetching all the message ${error}`);
    res.status(400).json("Internal Server Error!");
  }
};
