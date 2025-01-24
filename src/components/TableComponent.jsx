
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../features/employeeSlice";
import ModelforUpdateAdd from "./ModelforUpdateAdd";
import { useState } from "react";

export default function BasicTable() {
  const { loginEmployee, otherEmployees, loading, error } = useSelector(
    (state) => state.employee
  );

  // State for modal and selected employee
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const dispatch = useDispatch();
  console.log(loginEmployee, otherEmployees);
  const token = sessionStorage.getItem("token");

  async function handleDeleteButton(id) {
    console.log("the clicked:", id);

    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DELETE_URL}/${id}`,
      // `http://localhost:8080/employee/delete/${id}`,
      {
        headers: { Authorization: `${token}` },
      }
    );

    // Dispatching the action type.
    dispatch(deleteEmployee(response.data.id));
  }

  // Function to handle edit button click
  const handleEditButtonClick = (employee) => {
    setSelectedEmployee(employee); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); 
    setSelectedEmployee(null); 
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ fontWeight: "bold" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Id</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Mobile_Number</b>
            </TableCell>
            <TableCell>
              <b>Email_ID</b>
            </TableCell>
            <TableCell>
              <b>Role</b>
            </TableCell>
            <TableCell>
              <b>Address</b>
            </TableCell>
            {(loginEmployee.Role === "Admin" ||
              loginEmployee.Role === "Senior Developer") && (
              <TableCell>
                <b>Edit</b>
              </TableCell>
            )}
            {loginEmployee.Role === "Admin" && (
              <TableCell>
                <b>Delete</b>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {otherEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell component="th" scope="row">
                <b>{`VRT ${employee.id}`}</b>
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phone_number}</TableCell>
              <TableCell>{employee.email_id}</TableCell>
              <TableCell>{employee.Role}</TableCell>
              <TableCell>
                {employee.address && employee.address !== ""
                  ? employee.address
                  : "Address not Added"}
              </TableCell>
              {(loginEmployee.Role === "Admin" ||
                loginEmployee.Role === "Senior Developer") && (
                <TableCell>
                  <IconButton onClick={() => handleEditButtonClick(employee)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              )}
              {loginEmployee.Role === "Admin" && (
                <TableCell>
                  <IconButton onClick={() => handleDeleteButton(employee.id)}>
                    <DeleteForever />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedEmployee && (
        <ModelforUpdateAdd
          open={open}
          handleClose={handleClose}
          type="Update Details"
          data={selectedEmployee} 
        />
      )}
    </TableContainer>
  );
}
