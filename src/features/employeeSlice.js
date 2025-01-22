import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginEmployee: {},
  otherEmployees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getAllEmployees: (state, action) => {
      //   console.log("the action insde of the getAllemployees:", action);

      state.loginEmployee = { ...action.payload.loginEmployee };
      state.otherEmployees = [...action.payload.otherEmployees];
    },
    updateEmployee: (state, action) => {
      //console.log("the action in the updateEmployee folder :", action);

      state.otherEmployees = state.otherEmployees.map((element) =>
        element.id == action.payload.id ? action.payload : element
      );
    },
    addNewEmployee: (state, action) => {
      console.log("in the adding the new employee:", action);
      state.otherEmployees = [...state.otherEmployees, action.payload];
    },
    deleteEmployee: (state, action) => {
      console.log("deleting the user:", action);
      state.otherEmployees = state.otherEmployees.filter(
        (element) => element.id != action.payload
      );
    },
    deleteAllEmployees:(state)=>{
        state.loginEmployee={};
        state.otherEmployees=[];
    }
  },
});

export default employeeSlice.reducer;
export const { getAllEmployees, updateEmployee, addNewEmployee,deleteEmployee,deleteAllEmployees } =
  employeeSlice.actions;
