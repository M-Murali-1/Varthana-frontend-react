import React from "react";
import { useReducer } from "react";
import UserRegistration from "./UserRegistration";
function SignupPage() {
  function handleRegister(e) {
    e.preventDefault();
   
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2 py-5">
     <UserRegistration type="Register"/>
    </div>
  );
}

export default SignupPage;
