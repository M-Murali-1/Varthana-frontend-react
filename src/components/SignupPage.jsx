import React from "react";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import UserRegistration from "./UserRegistration";
const initialState = {
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
function SignupPage() {
  const [registerDetails, dispatch] = useReducer(reducer, initialState);
  console.log(registerDetails);
  function handleRegister(e) {
    e.preventDefault();
    console.log("the data got :",registerDetails);
    
  }
  // const inputFieldsData = [
  //   {
  //     id: "email",
  //     title: "Email",
  //     type: "email",
  //     placeholder: "Enter your email id",
  //     handleChange: handleEmailChange,
  //     value: loginData.email_id,
  //     required: true,
  //   },
  // ];
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2 py-5">
     <UserRegistration type="Register"/>
    </div>
  );
}

export default SignupPage;
