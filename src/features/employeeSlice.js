import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  employeeData: {},
  employeeLoading: true,
  employeeError: "",
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  (loginData,{ rejectWithValue }) => {
    return axios
      .post("http://localhost:8080/auth/login", loginData)
      .then((result) => {
        console.log(result);
        return result;
      }).catch((err)=>{
          console.log(err);
          return rejectWithValue(err); 
      } )
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getAllEmployees:(state,action)=>{
      console.log("the value is:",action.payload);
      
      state.employeeData = action.payload;
      console.log(state,"the state");
      
    },
    addEmployee:(state,action)=>{
      console.log("the data got here is :",action.payload);
      
      state.employeeData.otherEmployee =[...state.employeeData.otherEmployee,...action.payload];
    },
    updateEmployee:(state,action)=>{

    },
    deleteEmployee:(state,action)=>{

    }
  },
  extraReducers: (builders) => {
    builders.addCase(fetchEmployees.pending, (state) => {
      state.employeeLoading = true;
    });
    builders.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employeeLoading = false;
      (state.employees = action.payload), (state.employeeError = "");
    });
    builders.addCase(fetchEmployees.rejected, (state,action) => {
      (state.employeeLoading = false),
        (state.employeeError = action.payload),
        (state.employees = []);
    });
  },
});

export default employeeSlice.reducer;
export const {getAllEmployees,addEmployee,updateEmployee,deleteEmployee} = employeeSlice.actions;
