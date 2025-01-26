import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LinkComponent from "./LinkComponent";
import InputFieldComponent from "./InputFieldComponent";
import { emailValidation, passwordValidation } from "../utils/validations";
import EmailIcon from "@mui/icons-material/Email";

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
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`,
        //"http://localhost:8080/auth/login",
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

  // Removing the error when there is an error and we changed the data in the login form.
  useEffect(() => {
    if (error !== "") {
      setError("");
    }
  }, [loginData]);

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
      // error: emailValidation(loginData.email_id),
      icon: <EmailIcon />,
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Enter your password",
      handleChange: handlePasswordChange,
      value: loginData.password,
      required: true,
      // error: passwordValidation(loginData.password),
    },
  ];

  return (
    <div className="">
      {/* <div className="absolute top-0 left-0 p-4 flex gap-5 items-center">
        <a href="https://varthana.com/" className="">
          <img
            src="/Varthana_Logo.png"
            className="h-16 w-16 rounded-full"
            alt="Varthana Logo"
          />
        </a>
        <p className="text-[#56A446] font-bold">Welcome to Varthana</p>
      </div> */}
      <div className=" min-h-screen flex flex-col  bg-gray-100 items-center justify-center px-2">
        {/* <p>Welcome to Varthana</p> */}
        {/* <img src="/Varthana_Logo.png" className="rounded-full my-2 h-16 w-16" alt="Varthana Logo" /> */}
        <img
          src="/Varthana_Logo1.webp"
          className="rounded-full mb-5"
          alt="Varthana Logo"
        />

        <div className="bg-white p-8 rounded-lg shadow-md w-80 mb-5">
          <p className="text-center text-2xl font-bold my-3">Login</p>

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
              className="bg-[#57A649] text-white w-full py-2 mb-2 rounded-md hover:opacity-80"
            >
              Login
            </button>
          </form>
          {/* Links for Navigating to the register and forgot password page..! */}
          <LinkComponent
            path="/signup-page"
            data="Don't have an account? Sign up."
          />
          <LinkComponent path="/forget-password-page" data="Forgot Password" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
