import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loginemployeeData: {},
  otherEmployeeData:[],
  employeeLoading: true,
  employeeError: "",
};

// export const fetchEmployees = createAsyncThunk(
//   "employee/fetchEmployees",
//   (loginData, { rejectWithValue }) => {
//     return axios
//       .post("http://localhost:8080/auth/login", loginData)
//       .then((result) => {
//         console.log(result);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//         return rejectWithValue(err);
//       });
//   }
// );

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getAllEmployees: (state, action) => {
      console.log("the value is:", action.payload,state.employeeData);

      state.employeeData = action.payload
      state.loginemployeeData = action.payload.loginEmployee;
      state.otherEmployeeData = action.payload.otherEmployees;
      console.log(state.loginemployeeData,"the state in getall employees");
      console.log(state.otherEmployeeData,"the ohter employees..")
    },
    addEmployee: (state, action) => {
      console.log("the action.payload in the adding the new employee is :",action.payload);
      
      state.otherEmployeeData=[...state.otherEmployeeData,action.payload];
      console.log("in the adding the employee:",state.otherEmployeeData);
       
    },
    updateEmployee: (state, action) => {
      console.log(
        "The data in the redux:",
        action.payload,
        state.otherEmployeeData
      );
      state.otherEmployeeData = state.otherEmployeeData.map(element=>{
        console.log("the individual count here is :",element);
        
        if(element.id===action.payload.id) {
          return action.payload;
        }
        return element;
      })
      console.log("the updated state is :",state.otherEmployeeData);
      
    },
    deleteEmployee: (state, action) => {},
  },
  // extraReducers: (builders) => {
  //   builders.addCase(fetchEmployees.pending, (state) => {
  //     state.employeeLoading = true;
  //   });
  //   builders.addCase(fetchEmployees.fulfilled, (state, action) => {
  //     state.employeeLoading = false;
  //     (state.employees = action.payload), (state.employeeError = "");
  //   });
  //   builders.addCase(fetchEmployees.rejected, (state, action) => {
  //     (state.employeeLoading = false),
  //       (state.employeeError = action.payload),
  //       (state.employees = []);
  //   });
  // },
});

export default employeeSlice.reducer;
export const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;
