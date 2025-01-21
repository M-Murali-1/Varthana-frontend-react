import axios from "axios";
import React, { useState } from "react";
import ModelforUpdateAdd from "./ModelforUpdateAdd";
const IndividualEmployeeDetails = ({
  employee,
  LoginUserRole,
  handleDelete,
  handleUpdate,
}) => {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  async function handleDeleteButton() {
    const response = await axios.delete(
      `http://localhost:8080/employee/delete/${employee.id}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
    handleDelete(employee.id);
  }
  return (
    <div className="bg-gray-200 rounded-lg p-4">
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
        {(LoginUserRole == "Admin" || LoginUserRole == "Senior Developer") && (
          <button
            className="rounded-lg bg-blue-500 text-white px-5 py-1"
            onClick={handleOpen}
          >
            Edit
          </button>
        )}
        {LoginUserRole == "Admin" && (
          <button
            className="rounded-lg bg-red-500 text-white px-5 py-1"
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        )}
      </div>
      <ModelforUpdateAdd
        open={open}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        type="Update Details"
        data={employee}
      />
    </div>
  );
};

export default IndividualEmployeeDetails;
