// stagesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
    name: "details",
    initialState: {}, // Initial state as an empty object
    reducers: {
        updateDetails: (state, action) => {
        const { title, value } = action.payload;
        // Use object assignment to update or create properties
        state[title] = value;
        },
    },
});  

export const { updateDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
