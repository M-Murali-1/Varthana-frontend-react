import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginUserInfo from "./LoginUserInfo";
import IndividualEmployeeDetails from "./IndividualEmployeeDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../features/employeeSlice";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/login-page");
  }

  const [employees, setEmployees] = useState({});
  const [error, setError] = useState("");  // Error state for handling errors
  const [loading, setLoading] = useState(true);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [updateEmployee, setUpdateEmployee] = useState(null);
  const [addEmployee, setAddEmployee] = useState(null);

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
      setEmployees(response.data);
      //console.log("the data inside the Homepage:", response.data);
      dispatch(getAllEmployees(response.data));  
    } catch (err) {
     // console.log("the error is :",err);
      
      setError(err.response.data.message||err.message || "Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const { loginEmployee, otherEmployees } = useSelector(
    (state) => state.employee
  );
  console.log("the data in the redux store is :", loginEmployee, otherEmployees);

  if (loading) {
    return <h1>Loading..!</h1>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching employees: {error}
      </div>
    );
  }
  console.log("the other employees here are :",Array.isArray(otherEmployees));
  
  const Employees = [...otherEmployees].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen">
      <LoginUserInfo
        employee={loginEmployee}
        handleAdd={setAddEmployee}
      />
      <div className="grid min-w-md lg:grid-cols-3 grid-cols-1 gap-5 p-5">
        {Object.values(otherEmployees).map((employee) => (
          <IndividualEmployeeDetails
            key={employee.id}  // Don't forget the `key` prop for lists!
            employee={employee}
            LoginUserRole={loginEmployee.Role}
            handleDelete={setDeleteEmployee}
            handleUpdate={setUpdateEmployee}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
