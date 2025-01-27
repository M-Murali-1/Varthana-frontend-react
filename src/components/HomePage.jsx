import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../features/employeeSlice";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import BasicTable from "./TableComponent";
import LoginUserInfo from "./LoginUserInfo";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Getting the token from the session storage.
  const token = sessionStorage.getItem("token");
  useEffect(()=>{
    if (!token) {
      navigate("/login-page");
    }
  },[])
  
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/login-page");
  };
  useEffect(()=>{
    dispatch(fetchEmployees());
  },[])

  const { loginEmployee, otherEmployees, loading, error } = useSelector(
    (state) => state.employee
  );
  console.log("the login employees are :",loginEmployee,otherEmployees);
  
  if (error!="") {
    navigate("/login-page");
  }
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size="3rem" sx={{ color: "#57A649" }} />
      </Box>
    );
  }

  // Sortng the employees by their ID's.
  const Employees = [...otherEmployees].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen">
      <LoginUserInfo employee={loginEmployee} />
      <div className="">
        <BasicTable />
      </div>
    </div>
  );
}

export default HomePage;
