// stagesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
    name: "details",
    initialState: {}, // Initial state as an empty object
    reducers: {
        updateDetails: (state, action) => {debugger
        const { title, value } = action.payload;
        // Use object assignment to update or create properties
        state[title] = value;
        },
        resetDetails: (state) => {
            return {};
        },
    },
});  

export const { updateDetails, resetDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
