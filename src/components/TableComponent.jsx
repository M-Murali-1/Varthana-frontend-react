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
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import TablePagination from "@mui/material/TablePagination";
import SelectingRoleComponent from "./selectingRoleComponent";
import InputFieldComponent from "./InputFieldComponent";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable() {
  const { loginEmployee, otherEmployees } = useSelector(
    (state) => state.employee
  );
  const [searchString, setSearchString] = useState("");
  const handleSearchString = (e) => {
    setSearchString(e.target.value);
  };
  const [selectedRole, setSelectedRole] = useState("");
  const handleSelectedRole = (e) => {
    setSelectedRole(e.target.value);
  };

  // State for modal and selected employee
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const dispatch = useDispatch();
  console.log(loginEmployee, otherEmployees);
  const token = sessionStorage.getItem("token");

  async function handleDeleteButton(id) {
    console.log("the clicked:", id);

    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_DELETE_URL
      }/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchByName = {
    id: "searchbyname",
    title: "Search By Name",
    type: "text",
    placeholder: "Enter the Employee Name",
    handleChange: handleSearchString,
    value: searchString,
    required: false,
    icon: <PersonIcon />,
  };
  let selectingRoleInput = {
    id: "role",
    value: selectedRole,
    handleChange: handleSelectedRole,
    options: ["Junior Developer", "Senior Developer", "Admin"],
  };
  console.log(
    "the data entered here is :",
    searchString,
    "the role here is :",
    selectedRole
  );

  // Filtering the employees based on the data given
  let searchEmployees = otherEmployees;
  if (searchString !== "") {
    searchEmployees = otherEmployees.filter((employee) =>
      employee.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }
  if (selectedRole !== "") {
    searchEmployees = searchEmployees.filter(
      (employee) => employee.Role === selectedRole
    );
  }

  return (
    <div>
      {/* For the purpose of serching and filtering */}
      <div className="flex justify-between items-center mx-5 my-2">
        <div className="w-2/5 md:w-1/4">
          <InputFieldComponent data={searchByName} />
        </div>
        <div className="w-2/5 md:w-1/4">
          {/* Field for selecting the role */}
          <SelectingRoleComponent data={selectingRoleInput} />
        </div>
      </div>
      <Paper>
        <TableContainer
          sx={{ maxHeight: "55vh", overflow: "auto", position: "relative" }}
        >
          <Table
            size="small"
            sx={{ color: "#48601c", fontWeight: "bold" }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#55a248", margin: 2 }}>
                  <b>Id</b>
                </TableCell>
                <TableCell sx={{ color: "#55a248" }}>
                  <b>Name</b>
                </TableCell>
                <TableCell sx={{ color: "#55a248" }}>
                  <b>Mobile Number</b>
                </TableCell>
                <TableCell sx={{ color: "#55a248" }}>
                  <b>Email ID</b>
                </TableCell>
                <TableCell sx={{ color: "#55a248" }}>
                  <b>Role</b>
                </TableCell>
                <TableCell sx={{ color: "#55a248" }}>
                  <b>Address</b>
                </TableCell>
                {(loginEmployee.Role === "Admin" ||
                  loginEmployee.Role === "Senior Developer") && (
                  <TableCell sx={{ color: "#55a248" }}>
                    <b>Edit</b>
                  </TableCell>
                )}
                {loginEmployee.Role === "Admin" && (
                  <TableCell sx={{ color: "#55a248" }}>
                    <b>Delete</b>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <StyledTableRow key={employee.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#48601c" }}
                    >
                      <b>{`VRT ${employee.id}`}</b>
                    </TableCell>
                    <TableCell sx={{ color: "#48601c" }}>
                      {employee.name}
                    </TableCell>
                    <TableCell sx={{ color: "#48601c" }}>
                      {employee.phone_number}
                    </TableCell>
                    <TableCell sx={{ color: "#48601c" }}>
                      {employee.email_id}
                    </TableCell>
                    <TableCell sx={{ color: "#48601c" }}>
                      {employee.Role}
                    </TableCell>
                    <TableCell sx={{ color: "#48601c" }}>
                      {employee.address &&
                      (employee.address.doorno ||
                        employee.address.street ||
                        employee.address.city)
                        ? `${[
                            employee.address.doorno,
                            employee.address.street,
                            employee.address.city,
                          ]
                            .filter(Boolean)
                            .join(", ")}`
                        : "-"}
                    </TableCell>
                    {(loginEmployee.Role === "Admin" ||
                      loginEmployee.Role === "Senior Developer") && (
                      <TableCell>
                        <IconButton
                          onClick={() => handleEditButtonClick(employee)}
                        >
                          <EditIcon sx={{ color: "#48601c" }} />
                        </IconButton>
                      </TableCell>
                    )}
                    {loginEmployee.Role === "Admin" && (
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteButton(employee.id)}
                        >
                          <DeleteForever sx={{ color: "#48601c" }} />
                        </IconButton>
                      </TableCell>
                    )}
                  </StyledTableRow>
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
        <div className="">
          <TablePagination
            sx={{}}
            rowsPerPageOptions={[15, 30, 50, 100]}
            component="div"
            count={searchEmployees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
}
