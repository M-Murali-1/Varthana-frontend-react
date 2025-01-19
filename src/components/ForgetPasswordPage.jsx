import React from "react";
import { Link ,useNavigate} from "react-router-dom";
function ForgetPasswordPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">Change Password</h2>
        <form>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phnumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number:
            </label>
            <input
              id="phnumber"
              type="tel"
              className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={()=>navigate("/reset-password-page")}
          >
            Reset Password Request
          </button>
        </form>
        <div>
          <Link to="/signup-page">
            <p className="text-blue-500 hover:underline">
              Don't have an account? Sign up.{" "}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
