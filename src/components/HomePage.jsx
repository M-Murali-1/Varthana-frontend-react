import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../features/employeeSlice";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FooterHomePage from "./FooterHomePage";
import BasicTable from "./TableComponent";
import LoginUserInfo from "./LoginUserInfo";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting the token from the session storage.
  const token = sessionStorage.getItem("token");

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/login-page");
  };
  useEffect(() => {
    if (!token) {
      navigate("/login-page");
    }
    dispatch(fetchEmployees());
  }, []);

  const { loginEmployee, otherEmployees, loading, error } = useSelector(
    (state) => state.employee
  );

  if (error != "") {
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
    <div className="min-h-screen relative bg-gray-50">
      <LoginUserInfo employee={loginEmployee} />
      <div className=" m-3">
        <BasicTable />
      </div>
      <div className="absolute bottom-0 w-full">
       <FooterHomePage/>
      </div>
    </div>
  );
}

export default HomePage;
