import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputFieldComponent from "./InputFieldComponent";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate=useNavigate();
  const initial = { email_id: "", password: "" };
  const [loginData, setLoginData] = useState(initial);
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(password, email);
  console.log(loginData);

  async function handleLoginPage(e) {
    e.preventDefault();
    try {
      // const data = await fetch("localhost/8081/api/signup",{method:"POST"})
      //const data = await axios.post("http://localhost:8081/auth/signin",{email_id:email,password:password});
      setError("");
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );
      console.log("Response Data:", response.data);
      //console.log("Response Data:", response.data);
      setLoginData(initial);
      sessionStorage.setItem("token", response.data.token);
      navigate("/home-page");
    } catch (err) {
      console.log("the error occured here is :", err);
      setError(err.response.data.message);
    }
  }
  if (error) {
    console.log("there is an error..!");
  }
  console.log(
    "The token from the session storage is :",
    sessionStorage.getItem("token")
  );

  function handleEmailChange(e) {
    setLoginData((prev) => ({ ...prev, email_id: e.target.value }));
  }
  function handlePasswordChange(e) {
    setLoginData((prev) => ({ ...prev, password: e.target.value }));
  }
  console.log("the error is :", error);
  const inputFieldsData = [
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Enter your email id",
      handleChange: handleEmailChange,
      value: loginData.email_id,
      required: true,
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Enter your password",
      handleChange: handlePasswordChange,
      value: loginData.password,
      required: true,
    },
    
  ];
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLoginPage}>
          {
            inputFieldsData.map(element=>(
              <InputFieldComponent key={element.title} data={element}/>
            ))
          }
          {/* <InputFieldComponent passwordData={passwordData} /> */}
          {/* <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={loginData.email_id}
              onChange={handleEmailChange}
              className="border w-full px-4 py-2 rounded-md"
              placeholder="Enter your email"
              // required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              className="border w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              // required
            />
          </div> */}
          <div className="text-red-500 mb-1">{error && <p>{error}</p>}</div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div>
          <Link to="/signup-page">
            <p className="text-blue-500 hover:underline">
              Don't have an account? Sign up.{" "}
            </p>
          </Link>
          <Link to="/forget-password-page">
            <p className="text-blue-500 hover:underline">Forget Password</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
