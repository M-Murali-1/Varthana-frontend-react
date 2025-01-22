import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginUserInfo from "./LoginUserInfo";
import { getAllEmployees } from "../features/employeeSlice";
import IndividualEmployeeDetails from "./IndividualEmployeeDetails";

function HomePage() {
  // Getting the token from the session storage.
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/login-page");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { loginEmployee, otherEmployees } = useSelector(
    (state) => state.employee
  );

  // Function for the purpose of fetching the data and storing it inside the store.
  const getDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:8080/employee/getall",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
     dispatch(getAllEmployees(response.data));
    } catch (err) {
     setError(
        err.response.data.message || err.message || "Error fetching employees"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return <h1>Loading..!</h1>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching employees: {error}</div>
    );
  }
  
  // Sortng the employees by their ID's.
  const Employees = [...otherEmployees].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen">
      <LoginUserInfo employee={loginEmployee} />
      <div className="grid min-w-md lg:grid-cols-3 grid-cols-1 gap-5 p-5">
        {Object.values(Employees).map((employee) => (
          <IndividualEmployeeDetails key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
