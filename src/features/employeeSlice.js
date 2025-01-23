import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginEmployee: {},
  otherEmployees: [],
  loading: true,
  error: "",
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/employee/getall",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("the data", response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);
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
    deleteAllEmployees: (state) => {
      state.loginEmployee = {};
      state.otherEmployees = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.loginEmployee = { ...action.payload.loginEmployee };
      state.otherEmployees = [...action.payload.otherEmployees];
    });
    builders.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      console.log("the error is:", action);

      state.error = action.payload || "Error fetching employees";
      state.loginEmployee = {};
      state.otherEmployees = [];
    });
  },
});

export default employeeSlice.reducer;
export const {
  getAllEmployees,
  updateEmployee,
  addNewEmployee,
  deleteEmployee,
  deleteAllEmployees,
} = employeeSlice.actions;
