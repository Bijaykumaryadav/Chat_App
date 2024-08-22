// src/pages/SignUp.jsx
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:4000/user/signUp");
    }catch(error){
      console.log("Error during the signup:",error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        className="flex flex-col items-center p-6 space-y-4 bg-[#f9f9f9] border border-gray-300 rounded-lg shadow-md w-11/12 max-w-md"
        onSubmit={handleSubmit}
      >
        <label className="w-full">
          Email:
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="w-full">
          Username:
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="w-full">
          Password:
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white transition-colors duration-300 bg-blue-700 rounded-lg hover:bg-blue-500">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
