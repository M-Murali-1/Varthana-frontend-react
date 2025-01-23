import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LinkComponent from "./LinkComponent";
import InputFieldComponent from "./InputFieldComponent";
import { emailValidation, passwordValidation } from "../utils/validations";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import { OutlinedInput } from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const initial = { email_id: "", password: "" };
  const [loginData, setLoginData] = useState(initial);

  // Logic for handling the login page submission.
  async function handleLoginPage(e) {
    e.preventDefault();
    setError("");

    try {
      console.log(loginData, "this is the login data");
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );

      setLoginData(initial);

      // Setting the token within the sessionstorage.
      sessionStorage.setItem("token", response.data.token);
      navigate("/home-page");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  // functional logic for storing the data from the input fields.
  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, email_id: e.target.value }));
  };
  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, password: e.target.value }));
  };

  // Data required for creating the input fileds (emailid,password)
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
      icon:<EmailIcon/>
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
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gray-100 px-2">
      
      {/* <img src="/Varthana_Logo.png" className="rounded-full my-2" alt="Varthana Logo" /> */}
      
      <div className="bg-white p-8 rounded-lg shadow-md w-80 mb-5">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLoginPage}>
        
          {/* Generating the input field components..! */}
          {inputFieldsData.map((element) => (
            <InputFieldComponent key={element.title} data={element} />
          ))}

          {/* Displaying the Server side errors while logging..! */}
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
        {/* Links for Navigating to the register and forgot password page..! */}
          <LinkComponent
            path="/signup-page"
            data="Don't have an account? Sign up."
          />
          <LinkComponent path="/forget-password-page" data="Forget Password" />
      </div>
    </div>
  );
}

export default LoginPage;
