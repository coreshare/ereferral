import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appStep",
    initialState: 1,
    reducers: {
        setAppStep: (state, action) => {
            return action.payload;
          },
    },
});  

export const { setAppStep } = appSlice.actions;
export default appSlice.reducer;
