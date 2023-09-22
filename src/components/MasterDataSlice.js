import { createSlice } from "@reduxjs/toolkit";

const masterDataSlice = createSlice({
    name: "masterData",
    initialState: {
        NHSNumbers: [],
        Religions: [],
        Ethnicity: [],
        MaritalStatuses: [],
        MedicalOncologists: [],
        ClinicalOncologists: [],
        UpgradeScreening: [],
        Covid: [],
        SpecialIndicator: [],
        CommunicationRequirement: []
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
        setMedicalOncologistList: (state, action) => {
            state.MedicalOncologists = action.payload;
        },
        setClinicalOncologistList: (state, action) => {
            state.ClinicalOncologists = action.payload;
        },
        setUpgradeScreeningList: (state, action) => {
            state.UpgradeScreening = action.payload;
        },
        setCovidList: (state, action) => {
            state.Covid = action.payload;
        },
        setSpecialIndicatorList: (state, action) => {
            state.SpecialIndicator = action.payload;
        },
        setCommunicationRequirementList: (state, action) => {
            state.CommunicationRequirement = action.payload;
        },
    },
});  

export const { setNHSNumbers, setReligions, setEthnicity, setMaritalStatuses, 
    setMedicalOncologistList, setClinicalOncologistList, setUpgradeScreeningList,
    setCovidList, setSpecialIndicatorList, setCommunicationRequirementList } = masterDataSlice.actions;
export default masterDataSlice.reducer;
