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
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GETALL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    updateEmployee: (state, action) => {
      state.otherEmployees = state.otherEmployees.map((element) =>
        element.id == action.payload.id
          ? { ...element, ...action.payload }
          : element
      );
    },
    addNewEmployee: (state, action) => {
      state.otherEmployees = [...state.otherEmployees, action.payload];
    },
    deleteEmployee: (state, action) => {
      state.otherEmployees = state.otherEmployees.filter((element) => {
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
