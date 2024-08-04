//src/pages/SignIn.jsx
const SignIn = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form className="flex flex-col items-center p-6 space-y-4 bg-[#f9f9f9] border border-gray-300 rounded-lg shadow-md w-11/12 max-w-md">
        <label className="w-full">
          Email:
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            type="email"
            placeholder="Enter Email"
            required
          />
        </label>
        <label className="w-full">
          Password:
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            type="password"
            placeholder="Enter Password"
            required
          />
        </label>
        <button className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white transition-colors duration-300 bg-blue-700 rounded-lg hover:bg-blue-500">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
