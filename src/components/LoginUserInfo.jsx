import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ModelforUpdateAdd from "./ModelforUpdateAdd";
import { deleteAllEmployees } from "../features/employeeSlice";

function LoginUserInfo() {
  // Methods for handling the actions on the store and redirections.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting the Login user info.
  const { employee } = useSelector((state) => ({
    employee: state.employee.loginEmployee,
  }));

  // State and the modal for handling the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Logic for handling the logout of the Employee.!
  function handleLogoutChange() {
    sessionStorage.removeItem("token");
    dispatch(deleteAllEmployees());
    navigate("/login-page");
  }

  return (
    <div className="flex p-5 bg-[#57A649] justify-between items-baseline">
      <p className="text-gray-800 font-semibold">
        {`Hi, ${employee.name} - ${employee.id}  ( ${employee.Role} )`}
      </p>
      <div className="flex gap-5">
        {employee.Role == "Admin" && (
          <button
            className="rounded-lg bg-[#236d80] text-white p-2"
            onClick={handleOpen}
          >
            New User
          </button>
        )}
        <button
          className="rounded-lg bg-[#236d80] text-white p-2"
          onClick={handleLogoutChange}
        >
          Logout
        </button>
      </div>
      <ModelforUpdateAdd
        open={open}
        handleClose={handleClose}
        type="Add New Employee"
        data={employee}
      />
    </div>
  );
}

export default LoginUserInfo;
