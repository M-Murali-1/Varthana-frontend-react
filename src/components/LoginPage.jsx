import React, { useState } from "react";
import axios from "axios";
import InputFieldComponent from "./InputFieldComponent";
import LinkComponent from "./LinkComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailValidation, passwordValidation } from "../utils/validations";
import { useEffect } from "react";
function LoginPage() {
  const navigate = useNavigate();
  const initial = { email_id: "", password: "" };
  const [loginData, setLoginData] = useState(initial);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
 
  async function handleLoginPage(e) {
    e.preventDefault();
    try {
      setError("");
      console.log(loginData,"this is the login data");
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );
      
      setLoginData(initial);
      sessionStorage.setItem("token", response.data.token);
      navigate("/home-page");
    } catch (err) {
      console.log("the error occured here is :", err);
      setError(err.response.data.message);
    }
  }
  function handleEmailChange(e) {
    setLoginData((prev) => ({ ...prev, email_id: e.target.value }));
  }
  function handlePasswordChange(e) {
    setLoginData((prev) => ({ ...prev, password: e.target.value }));
  }
  const inputFieldsData = [
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Enter your email id",
      handleChange: handleEmailChange,
      value: loginData.email_id,
      required: true,
      error: emailValidation(loginData.email_id),
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Enter your password",
      handleChange: handlePasswordChange,
      value: loginData.password,
      required: true,
      error: passwordValidation(loginData.password),
    },
  ];
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLoginPage}>
          {inputFieldsData.map((element) => (
            <InputFieldComponent key={element.title} data={element} />
          ))}
          <div className="text-red-500 mb-1 text-sm text-right">
            {error && <p>{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 mb-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div>
          <LinkComponent
            path="/signup-page"
            data="Don't have an account? Sign up."
          />
          <LinkComponent path="/forget-password-page" data="Forget Password" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
