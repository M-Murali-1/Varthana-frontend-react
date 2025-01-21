import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginUserInfo from "./LoginUserInfo";
import IndividualEmployeeDetails from "./IndividualEmployeeDetails";
function HomePage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/login-page");
  }
  const [employees, setEmployees] = useState({});
  const [error, setError] = useState("");
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
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, [deleteEmployee, updateEmployee, addEmployee]);

  if (loading) {
    return <h1>Loading..!</h1>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching employees:
        {error}
      </div>
    );
  }
  employees.otherEmployees.sort((a, b) => a.id - b.id);
  return (
    <div className="min-h-screen  ">
      <LoginUserInfo
        employee={employees.loginEmployee}
        handleAdd={setAddEmployee}
      />
      <div className="grid min-w-md  lg:grid-cols-3 grid-cols-1  gap-5 p-5">
        {Object.values(employees.otherEmployees).map((employee) => (
          <IndividualEmployeeDetails
            employee={employee}
            LoginUserRole={employees.loginEmployee.Role}
            handleDelete={setDeleteEmployee}
            handleUpdate={setUpdateEmployee}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
