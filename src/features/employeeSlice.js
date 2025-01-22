import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginEmployee:{hello:"hi"},
    otherEmployees:[],
}

const employeeSlice = createSlice({
    name:"employee",
    initialState,
    reducers:{
            addData:(state,action)=>{
                state.loginEmployee = {...state.loginEmployee,...action.payload}
            }
    }
})

export default employeeSlice.reducer;
export const {addData} = employeeSlice.actions;