import axios from "axios";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import SignupPage from "./SignupPage";
import UserRegistration from "./UserRegistration";
const IndividualEmployeeDetails = ({
  employee,
  LoginUserRole,
  handleDelete,
}) => {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("clicked", employee.id);

  let data = [
    { "Employee ID": `VRT ${employee.id}` },
    { Name: employee.name },
    { "Email ID": employee.email_id },
    { "Mobile Number": employee.phone_number },
    { Role: employee.Role },
    {
      Address:
        employee.address === null ? "No Address Added" : employee.address,
    },
  ];
  //console.log(data);
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
          //   console.log("the decoded data :", decoded[0]);
          return (
            <div className="flex gap-1" key={decoded[0]}>
              <p className="font-medium">{decoded[0]} : </p>
              <p> {decoded[1]}</p>
            </div>
          );
        })}
      </div>
      {/* <div className="flex ">
        <p className="font-bold">Name:</p>
        <p>{employee.name}</p>
      </div> */}
      <div className="flex justify-between mt-2">
        {(LoginUserRole == "admin" || LoginUserRole == "Senior Developer") && (
          <button
            className="rounded-lg bg-blue-500 text-white px-5 py-1"
            onClick={handleOpen}
          >
            Edit
          </button>
        )}
        {LoginUserRole == "admin" && (
          <button
            className="rounded-lg bg-red-500 text-white px-5 py-1"
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        )}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
        >
             <div className="flex justify-center items-center ">
          <div className="bg-white rounded-lg p-5 m-10 max-h-[80vh] overflow-y-auto shadow-lg max-w-lg md:max-w-3xl">
            <UserRegistration data ={employee} type="Update Details"/>
          </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default IndividualEmployeeDetails;
