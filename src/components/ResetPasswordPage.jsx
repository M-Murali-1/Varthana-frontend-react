import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFieldComponent from "./InputFieldComponent";
import LinkComponent from "./LinkComponent";
import axios from "axios";
import {
  passwordValidation,
  confirmPasswordValidation,
} from "../utils/validations";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  console.log("the id here is :", !id);
  if (!id) {
    navigate("/forget-password-page");
  }
  const initial = { password: "", confirm_password: "" };
  const [details, setDetails] = useState(initial);
  const [error, setError] = useState("");
  const handlePasswordChange = (e) =>
    setDetails({ ...details, password: e.target.value });
  const handleConfirmPasswordChange = (e) =>
    setDetails({ ...details, confirm_password: e.target.value });

  const inputFieldsData = [
    {
      id: "setpassword",
      title: "Set Password",
      type: "password",
      placeholder: "Enter your password",
      handleChange: handlePasswordChange,
      value: details.password,
      required: true,
      error: passwordValidation(details.password),
    },
    {
      id: "confirmpassword",
      title: "Confirm Your Password",
      type: "password",
      placeholder: "Confirm Password",
      handleChange: handleConfirmPasswordChange,
      value: details.confirm_password,
      required: true,
      error: confirmPasswordValidation(
        details.confirm_password,
        details.password
      ),
    },
  ];
  
  const isValid =
    !passwordValidation(details.password) &&
    !confirmPasswordValidation(details.confirm_password, details.password);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.patch(
        `http://localhost:8080/employee/updatepassword/${id}`,
        details
      );
      navigate("/login-page");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-bold mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Field for setting the password */}
          {inputFieldsData.map((element) => (
            <InputFieldComponent key={element.title} data={element} />
          ))}
          {error && (
            <p className="mb-2 text-red-500 text-sm text-right">{error}</p>
          )}
          <button
            type="submit"
            className={`bg-blue-500 text-white w-full py-2 rounded-md ${
              isValid ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Reset Password
          </button>
        </form>
        <LinkComponent
          path="/login-page"
          data="Have an account? Login"
        />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
