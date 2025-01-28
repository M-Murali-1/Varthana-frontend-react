import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ModelforUpdateAdd from "./ModelforUpdateAdd";
import { deleteAllEmployees } from "../features/employeeSlice";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex p-5 bg-[#fffbeb] justify-between items-center">
      <div className="flex gap-5 items-center">
        <img
          src="/Varthana_Logo.png"
          className="rounded-full  w-12 h-12"
          alt="Varthana Logo"
        />
        <p className="text-gray-800 font-semibold">
          {`Hi, ${employee.name} - ${employee.id}  ( ${employee.Role} )`}
        </p>
      </div>
      <div className="flex  text-white">
        <div className="block md:hidden">
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {employee.Role == "Admin" && (
              <div onClick={handleOpen} className="flex items-center ms-2">
                <PersonIcon/>
                <MenuItem >New User</MenuItem>
            
              </div>
              )}
               <div onClick={handleLogoutChange} className="flex items-center ms-3">
               <LogoutIcon/>
                <MenuItem >Logout</MenuItem>
            
              </div>
            </Menu>
        </div>
        <div className="hidden md:flex gap-5">
          {employee.Role == "Admin" && (
            <button
              className="rounded-lg bg-[#236d80] text-white p-2 flex gap-2 mx-1"
              onClick={handleOpen}
            >
              <PersonIcon/>
              New User
            </button>
          )}
          <button
            className="rounded-lg bg-[#236d80] text-white p-2 flex gap-2 mx-1"
            onClick={handleLogoutChange}
          ><LogoutIcon/>
            Logout
          </button>
        </div>
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
