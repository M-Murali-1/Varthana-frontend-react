import React, { useEffect, useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  nameValidation,
  emailValidation,
  phoneNumberValidation,
} from "../utils/validations";
import ResetPasswordPage from "./ResetPasswordPage";
function ForgetPasswordPage() {
  const initial = { name: "", phone_number: "", email_id: "" };
  const [details, setDetails] = useState(initial);
  const [error, setError] = useState("");
  console.log(error == "", error, "the roor", !error);

  const isValid =
    !nameValidation(details.name) &&
    !phoneNumberValidation(details.phone_number) &&
    !emailValidation(details.email_id);
  const navigate = useNavigate();
  console.log("the details that are changing here are :", details);

  const handleNameChange = (e) =>
    setDetails({ ...details, name: e.target.value });
  const handlePhNumberChange = (e) =>
    setDetails({ ...details, phone_number: e.target.value });
  const handleEmailChange = (e) =>
    setDetails({ ...details, email_id: e.target.value });
  useEffect(() => {
    setError("");
    console.log("rendering the useeffect");
  }, [details]);
  const handleReset = async (e) => {
    e.preventDefault();
    console.log("Now the details are:", details);
    try {
      let response = await axios.post(
        "http://localhost:8080/employee/findone",
        details
      );
      console.log("the response here is :", response.data.message);
      sessionStorage.setItem("id", response.data.id);
      navigate("/reset-password-page");
      //<ResetPasswordPage id={response.data.id}/>
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      console.log("the error here is :", error);

      //console.log("the error is :",err.response.data.message||err.message);

      //setError(err.)
    }
    //navigate("/reset-password-page");
  };
  let inputFieldsData1 = [
    {
      id: "name",
      title: "Name",
      type: "text",
      placeholder: "Enter your name",
      handleChange: handleNameChange,
      value: details.name,
      required: true,
      error: nameValidation(details.name),
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
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">Change Password</h2>
        <form>
          {inputFieldsData1.map((element) => (
            <InputFieldComponent key={element.title} data={element} />
          ))}
          {/* <div className="mb-2">
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
          </div> */}
          {error && (
            <p className="mb-2 text-red-500 text-sm text-right">{error}</p>
          )}
          <button
            type="submit"
            className={`bg-blue-500 text-white w-full py-2 rounded-md ${
              isValid && error == ""
                ? "hover:bg-blue-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleReset}
            disabled={!isValid && error != ""}
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
