import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  setSelectedChat,
  toggleShowSideBar,
  userSelector,
} from "../redux/reducers/userReducer";
import UserView from "./userView";
import axios from "axios";
import { createPortal } from "react-dom";
import { RotatingLines } from "react-loader-spinner";

const UserContainer = () => {
  const { initialUser, chats, showSideBar } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      const response = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
    } catch (error) {
      console.log(`Error in fetching chats ${error}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchChats();
    setLoading(false);
  }, []);

  const getName = (chat) => {
    if (chat.isGroupChat) {
      return {
        ...chat,
        profileImage: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
        name: chat.chatName,
      };
    } else {
      if (chat.users === undefined) {
        return;
      }
      let users = chat.users;
      const otherUser = users.find((obj) => obj._id !== initialUser.id);
      return otherUser;
    }
  };
};
