import React from "react";
import { Link } from "react-router-dom";
function ResetPasswordPage({id=""}) {
  console.log("the id we got here is :",id);
  if(id=="") {
    navigate("/forget-password-page")
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">
          Reset Your Password
        </h2>
        <form>
          {/* Field for setting the password */}
          <div className="mb-2">
            <label
              htmlFor="setpassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Set New Password:
            </label>
            <input
              id="setpassword"
              type="password"
              className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Field for confirming the password */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Your Password:
            </label>
            <input
              id="confirmpassword"
              type="password"
              className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-300"

          >
            Reset Password
          </button>
        </form>
        <div>
        <Link to="/login-page">
            <p className="text-blue-500 hover:underline mt-2">
              Have an account? Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
