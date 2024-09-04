module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    pingTimeOut: 60000,
    cors: {
      origin: "http://localhost:5173/",
    },
  });
  
  io.sockets.on("connection", function (socket) {
    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected");
    });

    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log(`User Joined the room ${room}`);
    });

    socket.on("typing",(room) => socket.in(room).emit("typing"));
    socket.on("stopTyping",(room) => socket.in(room).emit("stopTyping"));

    socket.on("newMessage",(newMessageRec) => {
        var chat = newMessageRec.chat;
        if(!chat.users){
            console.log(`Chat users not defined`);
            return;
        }
        //to broadcast to all the users of the room expect the sender
        io.to(chat._id).emit("messageReceived",newMessageRec);
    });

    socket.on("disconnect",function(){
        console.log("Socket disconnected");
    });
  });
};
