import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/users/forgotten-password", {
        email,
      });
      if (response.status === 200) {
        alert("Password reset link sent");
      } else {
        alert(response.data.message || "An error occurred");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(error.response.data.message || "Internal Server Error");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    //   Navigate if you really want to redirect on error
      navigate("/users/signIn");
    }

    clearInputs();
  };

  return (
      <div className="formOuterContainer flex justify-center items-center bg-authImage bg-cover bg-center h-[85vh] -mt-6">
        <form
          className="formContainer backdrop-blur-sm rounded-md bg-cover bg-center flex flex-col gap-2 justify-between h-fit w-3/4 md:w-1/2 lg:w-1/3 p-2 shadow-sm shadow-[#495057]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center p-1 text-lg font-semibold text-textOne">
            Reset your Password
          </h1>
          <div className="flex flex-col gap-2 justify-between">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>

          <div className="flex justify-around mt-5">
            <button
              type="submit"
              className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
  );
};

export default ForgottenPassword;
