import React from "react";

import { Link } from "react-router-dom";
import { useReducer } from "react";
let initialState = {
  name: "",
  username: "",
  phone_number: "",
  email_id: "",
  password: "",
  confirm_password: "",
  Role: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "handleNameChange":
      return { ...state, name: action.payload.name };
    case "handleUserNameChange":
      return { ...state, username: action.payload.username };
    case "handlePhNumberChange":
      return { ...state, phone_number: action.payload.phone_number };
    case "handlePasswordChange":
      return { ...state, password: action.payload.password };
    case "handleConfirmPasswordChange":
      return { ...state, confirm_password: action.payload.confirm_password };
    case "handleEmailIdChange":
      return { ...state, email_id: action.payload.email_id };
    case "handleRoleChange":
      return { ...state, Role: action.payload.Role };
    case "reset":
      return initialState;
  }
};
function UserRegistration({ data = "", type = "" }) {
  console.log(Object.keys(initialState));

  if (type != "Register") {
    let updatedState = {
      ...initialState,
      ...Object.keys(initialState).reduce((acc, element) => {
        if (data.hasOwnProperty(element)&&!element.includes("password")) {
          acc[element] = data[element];
        }
        return acc;
      }, {}),
    };
    initialState = updatedState;
  }
  console.log("the data:", initialState);

  const [registerDetails, dispatch] = useReducer(reducer, initialState);
  console.log(registerDetails);
  function handleRegister(e) {
    e.preventDefault();
    console.log("the data got :", registerDetails);
  }
  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-3xl">
        <h2 className="text-center text-2xl font-bold mb-6">{type}</h2>
        <form onSubmit={handleRegister}>
          <div className="flex gap-10 flex-col md:flex-row">
            {/* Set 1 */}
            <div className="w-full md:w-1/2">
              {/* Field for name */}
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
                  value={registerDetails.name}
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    dispatch({
                      type: "handleNameChange",
                      payload: { name: e.target.value },
                    })
                  }
                  required
                />
              </div>
              {/* Field for username */}
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  value={registerDetails.username}
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your username"
                  onChange={(e) =>
                    dispatch({
                      type: "handleUserNameChange",
                      payload: { username: e.target.value },
                    })
                  }
                  required
                />
              </div>
              {/* Field for phone number */}
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
                  value={registerDetails.phone_number}
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your mobile number"
                  onChange={(e) =>
                    dispatch({
                      type: "handlePhNumberChange",
                      payload: { phone_number: e.target.value },
                    })
                  }
                  required
                />
              </div>
              {/* Field for email */}
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  value={registerDetails.email_id}
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    dispatch({
                      type: "handleEmailIdChange",
                      payload: { email_id: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Set 2 */}
            <div className="w-full md:w-1/2">
              {/* Field for setting the password */}
              <div className="mb-2">
                <label
                  htmlFor="setpassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Set Password:
                </label>
                <input
                  id="setpassword"
                  type="password"
                  value={registerDetails.password}
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    dispatch({
                      type: "handlePasswordChange",
                      payload: { password: e.target.value },
                    })
                  }
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
                  value={registerDetails.confirm_password}
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Confirm your password"
                  onChange={(e) =>
                    dispatch({
                      type: "handleConfirmPasswordChange",
                      payload: { confirm_password: e.target.value },
                    })
                  }
                  required
                />
              </div>
              {/* Field for selecting the role */}
              <div className="mb-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Your Role:
                </label>
                <select
                  id="role"
                  value={registerDetails.Role}
                  onChange={(e) =>
                    dispatch({
                      type: "handleRoleChange",
                      payload: { Role: e.target.value },
                    })
                  }
                  className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {/* Button for submitting the form */}
              <button
                type="submit"
                className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
              <div className="mt-4 text-start md:text-end flex flex-col md:flex-row justify-between">
                <Link to="/login-page">
                  <p className="text-blue-500 hover:underline">
                    Have an account? Login
                  </p>
                </Link>
                <Link to="/forget-password-page">
                  <p className="text-blue-500 hover:underline">
                    Forgot Password?
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
