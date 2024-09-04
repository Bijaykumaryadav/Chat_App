import axios from "axios";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users/signUp", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log("Error during the signup:", error.message);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8000/api/v1/users/auth/google";
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <form
        className="flex flex-col items-center w-11/12 max-w-md p-6 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg animate__animated animate__fadeIn"
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
          <div className="relative w-full">
            <input
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 flex items-center cursor-pointer right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </label>
        <button className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white transition-colors duration-300 bg-gray-800 rounded-lg hover:bg-gray-600">
          Sign Up
        </button>
        <button
          className="flex items-center justify-center w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={handleGoogleSignIn}
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1 10.229C20.1 9.51996 20.0363 8.83814 19.9182 8.18359H10.5V12.0518H15.8818C15.65 13.3018 14.9454 14.3609 13.8864 15.07V17.579H17.1182C19.0091 15.8381 20.1 13.2745 20.1 10.229Z"
              fill="#4285F4"
            ></path>
            <path
              d="M10.491 19.9994C13.191 19.9994 15.4547 19.104 17.1092 17.5767L13.8774 15.0676C12.9819 15.6676 11.8365 16.0221 10.491 16.0221C7.8865 16.0221 5.68195 14.263 4.89559 11.8994H1.55469V14.4903C3.20014 17.7585 6.58195 19.9994 10.491 19.9994Z"
              fill="#34A853"
            ></path>
            <path
              d="M4.90454 11.8987C4.70454 11.2987 4.5909 10.6578 4.5909 9.99872C4.5909 9.33963 4.70454 8.69872 4.90454 8.09872V5.50781H1.56363C0.886363 6.85781 0.5 8.38508 0.5 9.99872C0.5 11.6124 0.886363 13.1396 1.56363 14.4896L4.90454 11.8987Z"
              fill="#FBBC05"
            ></path>
            <path
              d="M10.491 3.97727C11.9592 3.97727 13.2774 4.48182 14.3138 5.47273L17.1819 2.60454C15.4501 0.990909 13.1865 0 10.491 0C6.58195 0 3.20014 2.24091 1.55469 5.50909L4.89559 8.1C5.68195 5.73636 7.8865 3.97727 10.491 3.97727Z"
              fill="#EA4335"
            ></path>
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default SignUp;
