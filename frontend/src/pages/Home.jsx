import { useEffect, useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import { useDispatch, useSelector } from "react-redux";
import { authorizeUser, userSelector } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import "animate.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("signUp");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { initialUser } = useSelector(userSelector);

  useEffect(() => {
    dispatch(authorizeUser());
    if (initialUser.token) {
      navigate("/dashboard"); // Redirect to dashboard if the user is already logged in
    }
  }, [dispatch, navigate, initialUser.token]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="mb-8 text-4xl font-extrabold text-white animate__animated animate__fadeInDown">
        Welcome to ChatApp
      </h1>
      <p className="mb-8 text-center text-white animate__animated animate__fadeInUp">
        Connect, collaborate, and communicate effortlessly.
      </p>
      <div className="flex items-center justify-center p-1 mb-8 bg-white border border-gray-300 rounded-full shadow-lg">
        <button
          className={`w-32 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            activeTab === "signUp"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-800"
          }`}
          onClick={() => handleTabSwitch("signUp")}
        >
          Sign Up
        </button>
        <button
          className={`w-32 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            activeTab === "signIn"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-800"
          }`}
          onClick={() => handleTabSwitch("signIn")}
        >
          Sign In
        </button>
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
        {activeTab === "signUp" ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
};

export default HomePage;
