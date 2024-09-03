import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessageArray,
  setNotifications,
  userSelector,
} from "../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../animation/Animation - 1699174380745.json";

const ENDPOINT = "http://localhost:5173/";
var socket, selectedChatCompare;

function UserMessageForm() {
  const [message, setMessage] = useState("");
  const { selectedChat, initialUser, notifications } = useSelector(userSelector);
  const [socketIo, setSocketIo] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", initialUser);
    socket.on("connected", () => {
      setSocketIo(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("messageReceived", (newMessageRec) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRec.chat._id
      ) {
        //show notifications
      } else {
        //the logged in user and sender should not be same to receive the message as for sender
        if (newMessageRec.sender._id !== initialUser.id) {
          dispatch(setMessageArray(newMessageRec));
        }
      }
    });
  }, []);

  const fetchAllMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/chats/message/${selectedChat._id}`,
        config
      );
      dispatch(setMessageArray(data));
      socket.emit("joinChat", selectedChat._id);
    } catch (error) {
      console.log(`Error in fetching chat ${error}`);
    }
  };

  const clearInput = async () => {
    setMessage("");
  };

  const typingHandler = async (e) => {
    setMessage(e.target.value);
    if (!socketIo) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 3 && typing) {
        socket.emit("stopTyping", selectedChat._id);
        setTyping(false);
      }
    }, 3000); //stop typing if the user is not typing for 3 seconds
  };

  const submitHandler = async (e) => {
    e.perventDefault();
    socket.emit("stopTyping", selectedChat._id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${initialUser.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/chats/message",
      { chatId: selectedChat._id, content: message },
      config
    );
    socket.emit("newMessage", data);
    dispatch(setMessageArray(data));
    clearInput();
  };

  return (
    <>
      <ScrollableChat />
      {isTyping ? (
        <div>
          <Lottie
            animationData={animationData}
            style={{ width: 60, height: 60 }}
          />
        </div>
      ) : null}
      <div className="ml-1 inputContainer ">
        <form className="flex gap-8 sm:gap-14" onSubmit={submitHandler}>
          <textarea
            placeholder="Type your message ... "
            className="inputFeild  rounded-xl p-1 pb-2 focus:border-transparent focus:outline-none resize-none w-[60vw] h-10 sm:h-12  sm:p-2 scrollbar-thin"
            value={message}
            onChange={typingHandler}
            required
          ></textarea>
          <button
            className="p-2 text-lg text-white rounded-lg sendButton bg-violet-500 hover:bg-violet-600 "
            onClick={submitHandler}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default UserMessageForm;
