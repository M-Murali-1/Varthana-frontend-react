import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginUserInfo from "./LoginUserInfo";
import { fetchEmployees } from "../features/employeeSlice";
import IndividualEmployeeDetails from "./IndividualEmployeeDetails";
import BasicTable from "./TableComponent";
function HomePage() {
  // Getting the token from the session storage.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/login-page");
  }

  const { loginEmployee, otherEmployees,loading,error } = useSelector(
    (state) => state.employee
  );

  // Function for the purpose of fetching the data and storing it inside the store.
  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);
console.log("the login and the other employees are :",loginEmployee,otherEmployees);

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
      <div className="">
      {/* grid min-w-md lg:grid-cols-3 grid-cols-1 gap-5 p-5 */}
        {/* {Object.values(Employees).map((employee) => (
          <IndividualEmployeeDetails key={employee.id} employee={employee} />
        ))} */}
        <BasicTable />
      </div>
    </div>
  );
}

export default HomePage;
