import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginUserInfo from "./LoginUserInfo";
import IndividualEmployeeDetails from "./IndividualEmployeeDetails";
function HomePage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token"); // Retrieve token from session storage
  if (!token) {
    navigate("/login-page");
  }
  const [employees, setEmployees] = useState({}); // Initialize as an empty array
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  console.log("The deleted employee is :",deleteEmployee);
  
  const getDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:8080/employee/getall",
        {
          headers: {
            Authorization: `${token}`, // Use proper token format
          },
        }
      );

      console.log("Response data:", response.data);
      setEmployees(response.data); // Update state with API data
    } catch (error) {
      setError(error.response.data.message);
      console.log("the error :", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getDetails();
  }, [deleteEmployee]);

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

  return (
    <div className="min-h-screen  ">
      <LoginUserInfo employee={employees.loginEmployee} />
      <div className="grid min-w-md  lg:grid-cols-3 grid-cols-1  gap-5 p-5">
        {Object.values(employees.otherEmployees).map((employee) => (
          <IndividualEmployeeDetails
            employee={employee}
            LoginUserRole={employees.loginEmployee.Role}
            handleDelete={setDeleteEmployee}
          />
        ))}
      </div>
      {/* <div className="bg-white p-4 my-4 rounded shadow">
        {Object.keys(employees.otherEmployees).map((employee, index) => (
          <div key={index} className="p-2 border-b">
            <p>
              <strong>ID:</strong> {employee.id}
            </p>
            <p>
              <strong>Name:</strong> {employee.name}
            </p>
            <p>
              <strong>Role:</strong> {employee.role}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default HomePage;
