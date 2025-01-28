import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputFieldComponent from "./InputFieldComponent";
import LinkComponent from "./LinkComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  userNameValidation,
  emailValidation,
  phoneNumberValidation,
} from "../utils/validations";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function ForgetPasswordPage() {
  const initial = { username: "", phone_number: "", email_id: "" };
  const navigate = useNavigate();

  const [details, setDetails] = useState(initial);
  const [error, setError] = useState("");

  // Functions for handling the input field changes.
  // const handleNameChange = (e) =>
  //   setDetails({ ...details, name: e.target.value });
  const handleUserNameChange = (e) =>
    setDetails({ ...details, username: e.target.value });

  const handlePhNumberChange = (e) =>
    setDetails({ ...details, phone_number: e.target.value });
  const handleEmailChange = (e) =>
    setDetails({ ...details, email_id: e.target.value });

  // Logic for the validation of the input.
  const isValid =
    !userNameValidation(details.username) &&
    !phoneNumberValidation(details.phone_number) &&
    !emailValidation(details.email_id);

  useEffect(() => {
    if (error !== "") {
      console.log("rendering..!");
      
      setError("");
    }
  }, [details]);

  // Logic for the purpose of reseting the password.
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FINDONE_URL}`,
        //"http://localhost:8080/employee/findone",
        details
      );
      sessionStorage.setItem("id", response.data.id);
      navigate("/reset-password-page");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  // Data required for building the input fields.
  const inputFieldsData1 = [
    {
      id: "username",
      title: "Username",
      type: "text",
      placeholder: "Enter your username",
      handleChange: handleUserNameChange,
      value: details.username,
      required: true,
      error: userNameValidation(details.username),
      icon: <AccountCircleIcon />,
    },
    {
      id: "phnumber",
      title: "Phone Number",
      type: "tel",
      placeholder: "Enter your mobile number",
      handleChange: handlePhNumberChange,
      value: details.phone_number,
      required: true,
      error: phoneNumberValidation(details.phone_number),
      icon: <LocalPhoneIcon />,
    },
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Enter your email",
      handleChange: handleEmailChange,
      value: details.email_id,
      required: true,
      error: emailValidation(details.email_id),
      icon: <EmailIcon />,
    },
  ];
  console.log(inputFieldsData1?.[1]?.error, "this is the required one");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-2 bg-gradient-to-br from-green-100 via-gray-50 to-green-200">
      <img src="/Varthana_Logo1.webp" className="rounded-full mb-5" alt="Varthana Logo" />
     
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">Change Password</h2>
        <form>
          {inputFieldsData1.map((element) => (
            <InputFieldComponent key={element.title} data={element} />
          ))}
          {error && (
            <p className="mb-2 text-red-500 text-sm  text-right">{error}</p>
          )}
          <button
            type="submit"
            className={`bg-[#57A649] text-white w-full py-2 rounded-md ${
              isValid && error == ""
                ? "hover:bg-[#57A649]"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleReset}
            disabled={!isValid}
          >
            Reset Password Request
          </button>
        </form>
        <LinkComponent
          path="/signup-page"
          data="Don't have an account? Sign up."
        />
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
