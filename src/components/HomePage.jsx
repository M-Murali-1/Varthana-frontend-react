import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

import BasicTable from "./TableComponent";
import LoginUserInfo from "./LoginUserInfo";
import { fetchEmployees } from "../features/employeeSlice";

function HomePage() {
  // Getting the token from the session storage.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/login-page");
  }
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/login-page");
  };
  const { loginEmployee, otherEmployees, loading, error } = useSelector(
    (state) => state.employee
  );

  // Function for the purpose of fetching the data and storing it inside the store.
  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  // const handleErrorRedirection=()=>{
  //   setTimeout(() => {
  //     navigate("/login-page")
  //   }, 1000);
  // }

  console.log(
    "the login and the other employees are :",
    loginEmployee,
    otherEmployees
  );

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

  if (error) {
    return (
      <Box sx={{ width: 500 }}>
        {error && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            severity="error"
            sx={{ bgcolor: "#57A649" }}
            message={`Error fetching employees: ${error}`}
            key={"topcenter"}
          />
        )}
      </Box>
    );
    // return (
    //   <div className="text-red-500">Error fetching employees: {error}</div>
    // );
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
