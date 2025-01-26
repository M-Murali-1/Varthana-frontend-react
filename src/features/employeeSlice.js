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
        "http://localhost:8080/api/employee/getall",
        {
          headers: {
            Authorization: `Bearer ${token}1`,
          },
        }
      );
      console.log("the data", response.data);

      return response.data;
    } catch (err) {
      console.log("the error is :",err);
      
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
    updateEmployee: (state, action) => {
      console.log(
        "the action in the updateEmployee folder :",
        action.payload.id == 182
      );

      state.otherEmployees = state.otherEmployees.map((element) =>
        element.id == action.payload.id
          ? { ...element, ...action.payload }
          : element
      );
    },
    addNewEmployee: (state, action) => {
      console.log("in the adding the new employee:", action);
      state.otherEmployees = [...state.otherEmployees, action.payload];
    },
    deleteEmployee: (state, action) => {
      console.log("deleting the user:", action);
      state.otherEmployees = state.otherEmployees.filter((element) => {
        console.log(
          "the conditon is :",
          element.id,
          action.payload,
          typeof element.id,
          typeof action.payload
        );
        return element.id != action.payload;
      });
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
      let others = [...action.payload.otherEmployees].sort(
        (a, b) => a.id - b.id
      );
      state.otherEmployees = others;
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
  updateEmployee,
  addNewEmployee,
  deleteEmployee,
  deleteAllEmployees,
} = employeeSlice.actions;
