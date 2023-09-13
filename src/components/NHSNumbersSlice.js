import { createSlice } from "@reduxjs/toolkit";

const nhsNumbersSlice = createSlice({
    name: "nhsNumbers",
    initialState: [],
    reducers: {
        setNHSNumbers: (state, action) => {
            return action.payload;
          },
    },
});  

export const { setNHSNumbers } = nhsNumbersSlice.actions;
export default nhsNumbersSlice.reducer;
