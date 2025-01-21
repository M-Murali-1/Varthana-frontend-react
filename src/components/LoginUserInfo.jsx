import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelforUpdateAdd from "./ModelforUpdateAdd";

function LoginUserInfo({ employee, handleAdd }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  function handleLogoutChange() {
    sessionStorage.removeItem("token");
    navigate("/login-page");
  }

  return (
    <div className="flex p-5 bg-gray-100 justify-between items-baseline">
      <p className="text-gray-800 font-semibold">
        Hi, {employee.name} ({employee.Role})
      </p>
      <div className="flex gap-5">
        {employee.Role == "Admin" && (
          <button
            className="rounded-lg bg-purple-600 text-white p-2"
            onClick={handleOpen}
          >
            New User
          </button>
        )}
        <button
          className="rounded-lg bg-purple-600 text-white p-2"
          onClick={handleLogoutChange}
        >
          Logout
        </button>
      </div>
      <ModelforUpdateAdd
        open={open}
        handleClose={handleClose}
        handleAdd={handleAdd}
        type="Add New Employee"
        data={employee}
      />
    </div>
  );
}

export default LoginUserInfo;
