import { createSlice } from "@reduxjs/toolkit";

const masterDataSlice = createSlice({
    name: "masterData",
    initialState: {
        NHSNumbers: [],
        Religions: [],
        Ethnicity: [],
        MaritalStatuses: []
    },
    reducers: {
        setNHSNumbers: (state, action) => {
            state.NHSNumbers = action.payload;
        },
        setReligions: (state, action) => {
            state.Religions = action.payload;
        },
        setEthnicity: (state, action) => {
            state.Ethnicity = action.payload;
        },
        setMaritalStatuses: (state, action) => {
            state.MaritalStatuses = action.payload;
        },
    },
});  

export const { setNHSNumbers, setReligions, setEthnicity, setMaritalStatuses } = masterDataSlice.actions;
export default masterDataSlice.reducer;
