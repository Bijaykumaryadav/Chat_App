import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  initialUser: {},
  showProfile: false,
  showSideBar: false,
  showUserProfile: {},
  searchedUsers: [],
  selectedChat: {},
  chats: [], // Add this if 'chats' should be part of the initial state
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    authorizeUser: (state, action) => {
      return {
        ...state,
        initialUser: JSON.parse(localStorage.getItem("user")) || {},
      };
    },
    logOutUser: (state, action) => {
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully!");
      return {
        ...initialState,
        initialUser: {},
      };
    },

    toggleShowSideBar: (state, action) => {
      return {
        ...state,
        showSideBar: !state.showSideBar,
      };
    },

    toggleShowProfile: (state, action) => {
      return {
        ...state,
        showProfile: !state.showProfile,
        showUserProfile: action.payload,
      };
    },

    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },

    setProfileImage: (state, action) => {
      state.initialUser.profileImage = action.payload.profileImage;
    },

    setSelectedChat: (state, actions) => {
      state.selectedChat = actions.payload;
    },

    setChats: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        const newChats = payload.filter(
          (chat) =>
            !state.chats.some((existingChat) => existingChat.id === chat.id)
        );
        state.chats = [...newChats, ...state.chats];
      } else if (typeof payload === "object") {
        if (payload.message === "Group Chat Id Sent!") {
          return;
        }
        const existingChatIndex = state.chats.findIndex(
          (existingChat) => existingChat._id === payload._id
        );
        if (existingChatIndex !== -1) {
          state.chats[existingChatIndex] = payload;
        } else {
          state.chats = [payload, ...state.chats];
        }
      }
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  authorizeUser,
  logOutUser,
  toggleShowProfile,
  setSearchedUsers,
  toggleShowSideBar,
  setProfileImage,
  setChats,
} = userSlice.actions;

export const userSelector = (state) => state.userReducer;
