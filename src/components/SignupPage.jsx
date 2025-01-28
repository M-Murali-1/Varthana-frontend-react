import React from "react";
import UserRegistration from "./UserRegistration";
function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-2 py-5 bg-gradient-to-br from-green-100 via-gray-50 to-green-200">
       <img src="/Varthana_Logo1.webp" className="rounded-full mb-5" alt="Varthana Logo" />
     
      <UserRegistration type="Register" />
    </div>
  );
}

export default SignupPage;
