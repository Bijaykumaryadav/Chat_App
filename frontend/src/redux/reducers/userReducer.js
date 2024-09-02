import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  initialUser: {},
  showProfile: false,
  showSideBar: false,
  showUserProfile: {},
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

    setProfileImage: (state, action) => {
      state.initialUser.profileImage = action.payload.profileImage;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  authorizeUser,
  logOutUser,
  toggleShowProfile,
  toggleShowSideBar,
  setProfileImage,
} = userSlice.actions;

export const userSelector = (state) => state.userReducer;
