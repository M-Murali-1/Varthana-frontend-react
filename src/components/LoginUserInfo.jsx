import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import UserRegistration from "./UserRegistration";
function LoginUserInfo({ employee,handleAdd }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleLogoutChange() {
    sessionStorage.removeItem("token");
    navigate("/login-page");
  }
  function handleModelOpen() {}
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
      <Modal open={open} onClose={handleClose}>
        <div className="flex justify-center items-center ">
          <div className="bg-white rounded-lg p-5 m-10 max-h-[80vh] overflow-y-auto shadow-lg max-w-lg md:max-w-3xl">
            <UserRegistration
              handleClose={handleClose}
              data={employee}
              type="Add New Employee"
              handleAdd = {handleAdd}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginUserInfo;
