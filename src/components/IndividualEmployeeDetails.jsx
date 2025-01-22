import axios from "axios";
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModelforUpdateAdd from "./ModelforUpdateAdd";
import { deleteEmployee } from "../features/employeeSlice";

const IndividualEmployeeDetails = ({ employee }) => {
  
  // Getting the token and the required fillds for bulding the individual employee.
  const token = sessionStorage.getItem("token");
  let data = [
    { "Employee ID": `VRT ${employee.id}` },
    { Name: employee.name },
    { "Email ID": employee.email_id },
    { "Mobile Number": employee.phone_number },
    { Role: employee.Role },
    {
      Address:
        employee.address === null || employee.address === ""
          ? "No Address Added"
          : employee.address,
    },
  ];
  const dispatch = useDispatch();
  
  // State and the functions for handling the modal opening and closing.
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Getting the Login employee role from the redux store.
  const { LoginUserRole } = useSelector((state) => ({
    LoginUserRole: state.employee.loginEmployee.Role,
  }));
  
  // Logic for handling the delete of the individual employee.
  async function handleDeleteButton() {
    const response = await axios.delete(
      `http://localhost:8080/employee/delete/${employee.id}`,
      {
        headers: { Authorization: `${token}` },
      }
    );

    // Dispatching the action type.
    dispatch(deleteEmployee(response.data.id));
  }

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      {/* Logic for the displaying the name,email,phoneNumber and the Adress of every single employee..! */}
      <div className="flex flex-col gap-2">
        {data.map((element) => {
          let [decoded] = Object.entries(element);
          return (
            <div className="flex gap-1" key={decoded[0]}>
              <p className="font-medium">{decoded[0]} : </p>
              <p> {decoded[1]}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-5 items-baseline">

        {/* Logic for the visiblility of the Edit utton based on the role..! */}
        {(LoginUserRole == "Admin" || LoginUserRole == "Senior Developer") && (
          <button
            className="rounded-lg bg-blue-500 text-white px-5 py-1"
            onClick={handleOpen}
          >
            Edit
          </button>
        )}
        {/* Logic for the handling the visibility of the delete button of the employee based on the role..! */}
        {LoginUserRole == "Admin" && (
          <button
            className="rounded-lg bg-red-500 text-white px-5 py-1"
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        )}
      </div>

      {/* Logic for the Opening of the modal for editing the individual employee details...! */}
      <ModelforUpdateAdd
        open={open}
        handleClose={handleClose}
        type="Update Details"
        data={employee}
      />
    </div>
  );
};

export default IndividualEmployeeDetails;
